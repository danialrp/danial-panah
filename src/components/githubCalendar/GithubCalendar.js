import React, {useState, useEffect, useContext, useRef} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./GithubCalendar.scss";

const WEEKS = 53;
const DAYS = 7;
const CELL = 13;
const GAP = 3;
const STEP = CELL + GAP;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["","Mon","","Wed","","Fri",""];

// GitHub's exact contribution colours — dark mode
// https://github.com/nicolo-ribaudo/tc39-proposal-async-context (inspect devtools)
const GH_DARK = ["#222933", "#0e4429", "#006d32", "#26a641", "#39d353"];
// GitHub's exact contribution colours — light mode
const GH_LIGHT = ["#dfdfe3", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

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

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function GithubCalendar() {
  const {isDark} = useContext(StyleContext);
  const [byDate, setByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Public API — no token needed, returns daily counts + level (0-4)
    fetch("https://github-contributions-api.jogruber.de/v4/danialrp?y=last")
      .then(r => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then(data => {
        const map = {};
        let sum = 0;
        (data.contributions || []).forEach(({date, count, level}) => {
          map[date] = {count, level};
          sum += count;
        });
        setByDate(map);
        setTotal(sum);
        setLoading(false);
        // scroll to the right so current month is visible on load
        setTimeout(() => {
          if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }, 0);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const COLORS = isDark ? GH_DARK : GH_LIGHT;
  const grid = buildGrid();
  const today = new Date();

  // Month labels
  const monthLabels = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    const month = week[0].getMonth();
    if (month !== lastMonth) {
      monthLabels.push({x: wi * STEP, label: MONTHS[month]});
      lastMonth = month;
    }
  });

  const DAY_COL_W = 28; // width reserved for Mon/Wed/Fri labels
  const SVG_WIDTH = WEEKS * STEP + DAY_COL_W + 4;
  const SVG_HEIGHT = DAYS * STEP + 28;

  return (
    <div className="github-calendar">
      <div className={isDark ? "calendar-header dark" : "calendar-header"}>
        <i className="fab fa-github gh-icon"></i>
        <span className="calendar-platform-label">GitHub Activity</span>
        {!loading && !error && (
          <span className="calendar-count">{total} contributions in the last year</span>
        )}
      </div>

      {loading && <div className="calendar-loading">Loading…</div>}
      {error && <div className="calendar-error">Could not load GitHub activity.</div>}

      {!loading && !error && (
        <div className="calendar-scroll-wrapper" ref={scrollRef}>
          <svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            className="calendar-svg"
            aria-label="GitHub contribution calendar"
          >
            {/* Month labels */}
            {monthLabels.map(({x, label}, i) => (
              <text
                key={i}
                x={x + DAY_COL_W}
                y={12}
                className={isDark ? "calendar-month dark" : "calendar-month"}
              >
                {label}
              </text>
            ))}

            {/* Day-of-week labels: Mon / Wed / Fri */}
            {DAY_LABELS.map((label, di) =>
              label ? (
                <text
                  key={di}
                  x={0}
                  y={di * STEP + 18 + CELL - 2}
                  className={isDark ? "calendar-day-label dark" : "calendar-day-label"}
                >
                  {label}
                </text>
              ) : null
            )}

            {/* Cells */}
            {grid.map((week, wi) =>
              week.map((date, di) => {
                const key = dateKey(date);
                const entry = byDate[key] || {count: 0, level: 0};
                const isFuture = date > today;
                return (
                  <rect
                    key={key}
                    x={wi * STEP + DAY_COL_W}
                    y={di * STEP + 18}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    ry={2}
                    fill={isFuture ? "transparent" : COLORS[entry.level]}
                    className="calendar-cell"
                  >
                    <title>
                      {entry.count} contribution{entry.count !== 1 ? "s" : ""} on {key}
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
