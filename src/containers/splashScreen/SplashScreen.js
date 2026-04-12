import React from "react";
import "./SplashScreen.css";

const STACKS = [
  {name: "Go", color: "#00acd7"},
  {name: "Python", color: "#FFD43B"},
  // {name: "Laravel", color: "#ff2d20"},
  {name: "Node.js", color: "#339933"},
  {name: "Docker", color: "#2496ed"},
  {name: "Redis", color: "#dc382d"},
  {name: "PostgreSQL", color: "#336791"}
];

const NAME = "DANIAL PANAH";

export default function SplashScreen() {
  return (
    <div className="splash-root">
      <div className="splash-scanlines" />

      <div className="splash-content">

        <div className="splash-terminal-line">
          <span className="splash-user">danialrp</span>
          <span className="splash-at">@</span>
          <span className="splash-host">dev</span>
          <span className="splash-sep">:~$</span>
          <span className="splash-cmd"> ./launch.sh</span>
          <span className="splash-cursor" />
        </div>

        <div className="splash-name-row">
          <span className="splash-bracket splash-bl">&lt;</span>
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              className="splash-letter"
              style={{animationDelay: `${0.45 + i * 0.065}s`}}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
          <span className="splash-bracket splash-br">/&gt;</span>
        </div>

        <div className="splash-tagline">Senior Backend Engineer</div>

        <div className="splash-stacks">
          {STACKS.map((stack, i) => (
            <span
              key={stack.name}
              className="splash-badge"
              style={{
                animationDelay: `${1.05 + i * 0.09}s`,
                borderColor: stack.color,
                color: stack.color
              }}
            >
              {stack.name}
            </span>
          ))}
        </div>

        <div className="splash-progress-wrap">
          <div className="splash-progress-meta">
            <span className="splash-progress-label">initializing</span>
            <span className="splash-progress-pct">100%</span>
          </div>
          <div className="splash-progress-track">
            <div className="splash-progress-bar" />
          </div>
        </div>

      </div>
    </div>
  );
}
