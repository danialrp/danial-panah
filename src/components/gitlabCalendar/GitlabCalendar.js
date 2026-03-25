import React, {useState, useEffect, useContext, useRef} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./GitlabCalendar.scss";

const GITLAB_USERNAME = "danialrp";
const TOKEN = process.env.REACT_APP_GITLAB_TOKEN;
const API = "https://gitlab.com/api/v4";

const WEEKS = 53;
const DAYS = 7;
const CELL = 13;
const GAP = 3;
const STEP = CELL + GAP;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// GitLab dark-mode contribution palette (purple/indigo scale)
// Matched from GitLab's own UI screenshot
const GL_DARK  = ["#2d2b3d", "#3e3c85", "#5b5db5", "#7f82cc", "#bbbdf3"];
// GitLab light-mode contribution palette
const GL_LIGHT = ["#ededed", "#c5c3f0", "#9999d8", "#6b6bbf", "#4040a0"];

function getColor(count, isDark) {
  const scale = isDark ? GL_DARK : GL_LIGHT;
  if (count === 0)  return scale[0];
  if (count <= 3)   return scale[1];
  if (count <= 9)   return scale[2];
  if (count <= 19)  return scale[3];
  return scale[4];
}

function buildGrid() {
  const today = new Date();
  // Anchor to the Sunday of the current week, then go back (WEEKS-1) full weeks
  // so the grid always includes today in the last column.
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - (WEEKS - 1) * DAYS);
  const grid = [];
  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * DAYS + d);
      week.push(date);
    }
    grid.push(week);
  }
  return grid;
}

function localDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function oneYearAgo() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return localDateKey(d);
}

function apiFetch(url) {
  const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};
  return fetch(url, {headers});
}

export default function GitlabCalendar() {
  const {isDark} = useContext(StyleContext);
  const [byDate, setByDate] = useState({});
  const scrollRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // 1 — resolve username → numeric id
        const uRes = await apiFetch(
          `${API}/users?username=${GITLAB_USERNAME}&per_page=1`
        );
        if (!uRes.ok) throw new Error(`user lookup ${uRes.status}`);
        const users = await uRes.json();
        if (!users.length) throw new Error("user not found");
        const uid = users[0].id;

        // 2 — first page + total-pages header
        const after = oneYearAgo();
        const base = `${API}/users/${uid}/events?after=${after}&per_page=100`;
        const p1Res = await apiFetch(`${base}&page=1`);
        if (!p1Res.ok) throw new Error(`events ${p1Res.status}`);
        const totalPages = parseInt(p1Res.headers.get("X-Total-Pages") || "1", 10);
        const page1 = await p1Res.json();

        // 3 — fetch remaining pages in parallel
        let all = [...page1];
        if (totalPages > 1) {
          const rest = await Promise.all(
            Array.from({length: totalPages - 1}, (_, i) =>
              apiFetch(`${base}&page=${i + 2}`).then(r => r.json())
            )
          );
          rest.forEach(p => { all = all.concat(p); });
        }

        // 4 — count contributions by local date
        // Push events: count each commit individually (matches GitLab's own calendar)
        // All other events (comments, MRs, issues, etc.): count as 1
        const counts = {};
        all.forEach(evt => {
          if (!evt.created_at) return;
          const key = evt.created_at.slice(0, 10);
          const add =
            evt.push_data && evt.push_data.commit_count > 0
              ? evt.push_data.commit_count
              : 1;
          counts[key] = (counts[key] || 0) + add;
        });

        console.log(
          `[GitlabCalendar] ${all.length} events across ${totalPages} page(s).`,
          "Sample keys:", Object.keys(counts).slice(0, 5)
        );

        setByDate(counts);
        setTotal(Object.values(counts).reduce((a, b) => a + b, 0));
        setLoading(false);
        // scroll to the right so current month is visible on load
        setTimeout(() => {
          if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }, 0);
      } catch (err) {
        console.error("[GitlabCalendar] failed:", err.message);
        setError(true);
        setLoading(false);
      }
    }
    load();
  }, []);

  const grid = buildGrid();
  const today = new Date();
  const SVG_WIDTH = WEEKS * STEP + 16;
  const SVG_HEIGHT = DAYS * STEP + 28;

  const monthLabels = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    const month = week[0].getMonth();
    if (month !== lastMonth) {
      monthLabels.push({x: wi * STEP, label: MONTHS[month]});
      lastMonth = month;
    }
  });

  return (
    <div className="gitlab-calendar">
      <div className={isDark ? "calendar-header dark" : "calendar-header"}>
        <i className="fab fa-gitlab gitlab-icon"></i>
        <span className="calendar-platform-label">GitLab Activity</span>
        {!loading && !error && (
          <span className="calendar-count">{total} contributions in the last year</span>
        )}
      </div>

      {loading && <div className="calendar-loading">Loading…</div>}
      {error && <div className="calendar-error">Could not load GitLab activity.</div>}

      {!loading && !error && (
        <div className="calendar-scroll-wrapper" ref={scrollRef}>
          <svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            className="calendar-svg"
            aria-label="GitLab contribution calendar"
          >
            {monthLabels.map(({x, label}, i) => (
              <text
                key={i}
                x={x + 2}
                y={12}
                className={isDark ? "calendar-month dark" : "calendar-month"}
              >
                {label}
              </text>
            ))}
            {grid.map((week, wi) =>
              week.map((date, di) => {
                const key = localDateKey(date);
                const count = byDate[key] || 0;
                const isFuture = date > today;
                return (
                  <rect
                    key={key}
                    x={wi * STEP}
                    y={di * STEP + 18}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    ry={2}
                    fill={isFuture ? "transparent" : getColor(count, isDark)}
                    className="calendar-cell"
                  >
                    <title>
                      {count} contribution{count !== 1 ? "s" : ""} on {key}
                    </title>
                  </rect>
                );
              })
            )}
          </svg>
        </div>
      )}
    </div>
  );
}
