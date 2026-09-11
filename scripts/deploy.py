#!/usr/bin/env python3
"""Deploy build/ to the shared host over FTP (TLS when the server offers it).

Credentials never live in this file. Put them in personal-website/.deploy.env
(git-ignored):

    FTP_HOST=ftp.example.com
    FTP_USER=username
    FTP_PASS=password
    FTP_REMOTE_DIR=/public_html        # where index.html must land
    FTP_PORT=21                        # optional
    FTP_TLS=auto                       # auto | yes | no

Usage (from personal-website/):

    npm run build && python3 scripts/deploy.py            # upload build/
    python3 scripts/deploy.py --dry-run                   # show what would change
    python3 scripts/deploy.py --no-prune                  # keep stale files on the server

What it does: uploads every file under build/ (creating directories as needed),
skips files whose size already matches (unless --force), removes stale hashed
bundles under static/ that no longer exist locally so old JS/CSS chunks don't
pile up, and then commits and pushes the working tree so the remote repo always
matches what is live (--no-git to skip). Nothing outside FTP_REMOTE_DIR is touched.
"""
import argparse
import datetime
import ftplib
import os
import posixpath
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / "build"
ENV_FILE = ROOT / ".deploy.env"
PRUNE_PREFIXES = ("static/",)  # only hashed assets get pruned; never the root
PRUNE_GRACE_HOURS = 24  # keep superseded bundles this long so a visitor's cached index.html still loads


def load_env():
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    env.update({k: v for k, v in os.environ.items() if k.startswith("FTP_")})
    missing = [k for k in ("FTP_HOST", "FTP_USER", "FTP_PASS", "FTP_REMOTE_DIR") if not env.get(k)]
    if missing:
        sys.exit(f"missing {', '.join(missing)} (set them in {ENV_FILE.name} or the environment)")
    return env


def connect(env):
    host, port = env["FTP_HOST"], int(env.get("FTP_PORT", 21))
    tls = env.get("FTP_TLS", "auto").lower()
    if tls in ("auto", "yes"):
        try:
            ftp = ftplib.FTP_TLS(timeout=30)
            ftp.connect(host, port)
            ftp.login(env["FTP_USER"], env["FTP_PASS"])
            ftp.prot_p()
            print(f"connected to {host}:{port} (FTPS)")
            return ftp
        except Exception as e:  # noqa: BLE001
            if tls == "yes":
                raise
            print(f"FTPS not available ({e.__class__.__name__}); falling back to plain FTP")
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(host, port)
    ftp.login(env["FTP_USER"], env["FTP_PASS"])
    print(f"connected to {host}:{port} (FTP)")
    return ftp


def remote_listing(ftp, base):
    """Walk the remote tree under base; return {relative_path: (size, modify)}."""
    files = {}

    def walk(rel):
        path = posixpath.join(base, rel) if rel else base
        try:
            entries = list(ftp.mlsd(path))
        except ftplib.error_perm:
            return
        for name, facts in entries:
            if name in (".", ".."):
                continue
            child = posixpath.join(rel, name) if rel else name
            if facts.get("type") == "dir":
                walk(child)
            elif facts.get("type") == "file":
                files[child] = (int(facts.get("size", -1)), facts.get("modify", ""))

    walk("")
    return files


def ensure_dir(ftp, base, rel_dir, made):
    parts = [p for p in rel_dir.split("/") if p]
    cur = base
    for p in parts:
        cur = posixpath.join(cur, p)
        if cur in made:
            continue
        try:
            ftp.mkd(cur)
        except ftplib.error_perm:
            pass  # exists
        made.add(cur)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true", help="upload even when size matches")
    ap.add_argument("--no-prune", action="store_true")
    ap.add_argument("--no-git", action="store_true", help="skip the commit-and-push after a successful upload")
    args = ap.parse_args()

    if not (BUILD / "index.html").exists():
        sys.exit("build/index.html not found; run `npm run build` first")

    env = load_env()
    base = env["FTP_REMOTE_DIR"].rstrip("/") or "/"
    local = {}
    for f in BUILD.rglob("*"):
        if f.is_file() and f.name != ".DS_Store":
            local[f.relative_to(BUILD).as_posix()] = f

    ftp = connect(env)
    try:
        remote = remote_listing(ftp, base)
        to_upload = [rel for rel, f in sorted(local.items()) if args.force or remote.get(rel, (None,))[0] != f.stat().st_size]
        cutoff = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=PRUNE_GRACE_HOURS)).strftime("%Y%m%d%H%M%S")
        stale = [rel for rel in sorted(remote)
                 if rel not in local and rel.startswith(PRUNE_PREFIXES) and remote[rel][1][:14] < cutoff]
        print(f"{len(local)} local files, {len(remote)} remote files, {len(to_upload)} to upload, {len(stale)} stale")
        if args.dry_run:
            for rel in to_upload:
                print("  upload", rel)
            for rel in stale:
                print("  delete", rel)
            return

        made = set()
        # index.html goes last so the site never references bundles that are not there yet
        ordered = [r for r in to_upload if r != "index.html"] + (["index.html"] if "index.html" in to_upload else [])
        for rel in ordered:
            ensure_dir(ftp, base, posixpath.dirname(rel), made)
            with open(local[rel], "rb") as fh:
                ftp.storbinary(f"STOR {posixpath.join(base, rel)}", fh)
            print("  uploaded", rel)
        if not args.no_prune:
            for rel in stale:
                ftp.delete(posixpath.join(base, rel))
                print("  deleted", rel)
        print("done")
    finally:
        try:
            ftp.quit()
        except Exception:  # noqa: BLE001
            pass
    if not args.no_git:
        push_to_git()


def push_to_git():
    """What is live must also be on the remote: commit the working tree and push.

    Secrets stay out by .gitignore (.env, .deploy.env, profile.json); this refuses to run
    if any of those is not ignored.
    """
    def git(*a, check=True):
        return subprocess.run(["git", *a], cwd=ROOT, check=check, capture_output=True, text=True)

    for secret in (".env", ".deploy.env", "public/profile.json"):
        if (ROOT / secret).exists() and git("check-ignore", "-q", secret, check=False).returncode != 0:
            sys.exit(f"refusing to commit: {secret} is not git-ignored")
    git("add", "-A")
    if git("diff", "--cached", "--quiet", check=False).returncode == 0:
        print("git: nothing to commit")
    else:
        stamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        git("commit", "-q", "-m", f"deploy: {stamp}\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>")
        print("git: committed")
    branch = git("branch", "--show-current").stdout.strip()
    r = git("push", "origin", branch, check=False)
    if r.returncode != 0:
        sys.exit(f"git push failed:\n{r.stderr}")
    print(f"git: pushed to origin/{branch}")


if __name__ == "__main__":
    main()
