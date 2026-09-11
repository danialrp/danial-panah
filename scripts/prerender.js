#!/usr/bin/env node
/**
 * Prerender build/index.html so crawlers and AI bots that don't run JavaScript
 * (GPTBot, ClaudeBot, PerplexityBot, CCBot and most link previewers) see the
 * full page content instead of an empty <div id="root">.
 *
 * Runs automatically after `npm run build` (postbuild). Serves build/ on a
 * local port, opens it in headless Chrome with the "Prerender" user agent
 * (which disables the splash screen, see src/portfolio.js), waits for the app
 * to settle, and writes the rendered DOM back to build/index.html. React then
 * hydrates that markup in real browsers (see src/index.js).
 */
const fs = require("fs");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");

const BUILD = path.resolve(__dirname, "..", "build");
const PORT = 47391;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain"
};

function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(BUILD, urlPath);
      if (!file.startsWith(BUILD)) file = path.join(BUILD, "index.html");
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(BUILD, "index.html");
      res.writeHead(200, {"Content-Type": MIME[path.extname(file)] || "application/octet-stream"});
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

(async () => {
  const indexPath = path.join(BUILD, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("prerender: build/index.html not found, run the build first");
    process.exit(1);
  }
  const server = await serve();
  const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox"]});
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Prerender) HeadlessChrome");
    await page.setViewport({width: 1366, height: 900});
    page.on("pageerror", e => console.warn("prerender: page error:", e.message));
    await page.goto(`http://127.0.0.1:${PORT}/`, {waitUntil: "networkidle0", timeout: 60000});
    // react-reveal keeps sections invisible until scrolled into view; walk the page so
    // every section has revealed, then give the fade animations time to finish.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.waitForFunction(
      () => document.querySelector("#greeting") && document.querySelector("#experience"),
      {timeout: 30000}
    );
    let html = await page.content();
    // The snapshot is taken at the scrolled-to-top state; strip inline reveal styles so
    // nothing stays invisible if hydration is slow.
    html = html.replace(/ style="opacity: 0;[^"]*"/g, "");
    if (!html.includes('id="root"') || html.length < 20000) {
      throw new Error("prerender: rendered HTML looks empty, keeping the original index.html");
    }
    fs.writeFileSync(indexPath, "<!DOCTYPE html>\n" + html.replace(/^<!DOCTYPE html>\s*/i, ""));
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    console.log(`prerender: wrote build/index.html (${(html.length / 1024).toFixed(0)} KB, ~${words} words of visible text)`);
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
