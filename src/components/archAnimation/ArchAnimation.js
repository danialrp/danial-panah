import React, {useEffect, useState, useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ArchAnimation.scss";

const LANGS = [
  {name: "Go", color: "#89dceb"},
  {name: "Python", color: "#f9e2af"},
  {name: "Laravel", color: "#cba6f7"},
];

export default function ArchAnimation() {
  const {isDark} = useContext(StyleContext);
  const [langIdx, setLangIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [reqCount, setReqCount] = useState(2847);

  // Cycle language with fade transition
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setLangIdx(i => (i + 1) % LANGS.length);
        setFade(true);
      }, 280);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  // Tick req/s counter
  useEffect(() => {
    const t = setInterval(() => {
      setReqCount(c => c + Math.floor(Math.random() * 9 + 2));
    }, 220);
    return () => clearInterval(t);
  }, []);

  const lang = LANGS[langIdx];

  return (
    <div className={`arch-anim-wrapper${isDark ? " dark" : ""}`}>
      <div className="arch-window">
        {/* Title bar */}
        <div className="arch-titlebar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="titlebar-label">system-architecture</span>
          <span className="req-badge">
            <span className="req-dot" />
            {reqCount.toLocaleString()} req/s
          </span>
        </div>

        {/* SVG diagram */}
        <div className="arch-body">
          <svg
            viewBox="0 0 360 300"
            xmlns="http://www.w3.org/2000/svg"
            className="arch-svg"
          >
            <defs>
              <marker
                id="arr-blue"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L0,5 L7,2.5 z" fill="#89b4fa" opacity="0.55" />
              </marker>
              <marker
                id="arr-red"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L0,5 L7,2.5 z" fill="#f38ba8" opacity="0.55" />
              </marker>
              <marker
                id="arr-green"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L0,5 L7,2.5 z" fill="#a6e3a1" opacity="0.55" />
              </marker>

              {/* Glow filters */}
              <filter id="glow-blue" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-green" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Connection lines ── */}
            {/* Client → API */}
            <line
              x1="180" y1="64" x2="180" y2="108"
              stroke="#313244" strokeWidth="1.5"
              strokeDasharray="5 3"
              markerEnd="url(#arr-blue)"
            />
            {/* API → Redis */}
            <line
              x1="256" y1="148" x2="292" y2="148"
              stroke="#313244" strokeWidth="1.5"
              strokeDasharray="5 3"
              markerEnd="url(#arr-red)"
            />
            {/* API → PostgreSQL */}
            <line
              x1="180" y1="172" x2="180" y2="232"
              stroke="#313244" strokeWidth="1.5"
              strokeDasharray="5 3"
              markerEnd="url(#arr-green)"
            />

            {/* ── Client node ── */}
            <rect
              x="114" y="16" width="132" height="48"
              rx="8" fill="#11111b" stroke="#89b4fa" strokeWidth="1.5"
            />
            <text
              x="180" y="35"
              textAnchor="middle"
              fill="#6c7086"
              fontSize="9"
              fontFamily="Fira Code, monospace"
              letterSpacing="1.2"
            >
              CLIENT
            </text>
            <text
              x="180" y="51"
              textAnchor="middle"
              fill="#89b4fa"
              fontSize="12"
              fontFamily="Fira Code, monospace"
              fontWeight="700"
            >
              Application
            </text>

            {/* ── API Layer node ── */}
            <rect
              x="100" y="110" width="156" height="62"
              rx="8" fill="#11111b" strokeWidth="1.5"
              stroke={lang.color}
              style={{transition: "stroke 0.3s ease"}}
            />
            <text
              x="178" y="128"
              textAnchor="middle"
              fill="#6c7086"
              fontSize="9"
              fontFamily="Fira Code, monospace"
              letterSpacing="1.2"
            >
              API LAYER
            </text>
            {/* Cycling language name */}
            <text
              x="178" y="155"
              textAnchor="middle"
              fontFamily="Fira Code, monospace"
              fontSize="14"
              fontWeight="700"
              fill={lang.color}
              style={{
                opacity: fade ? 1 : 0,
                transition: "opacity 0.28s ease, fill 0.28s ease",
              }}
            >
              {lang.name}
            </text>

            {/* ── Redis node ── */}
            <rect
              x="296" y="128" width="60" height="40"
              rx="8" fill="#11111b" stroke="#f38ba8" strokeWidth="1.5"
            />
            <text
              x="326" y="144"
              textAnchor="middle"
              fill="#6c7086"
              fontSize="9"
              fontFamily="Fira Code, monospace"
              letterSpacing="1.2"
            >
              CACHE
            </text>
            <text
              x="326" y="160"
              textAnchor="middle"
              fill="#f38ba8"
              fontSize="12"
              fontFamily="Fira Code, monospace"
              fontWeight="700"
            >
              Redis
            </text>

            {/* ── PostgreSQL node ── */}
            <rect
              x="110" y="236" width="140" height="50"
              rx="8" fill="#11111b" stroke="#a6e3a1" strokeWidth="1.5"
            />
            <text
              x="180" y="255"
              textAnchor="middle"
              fill="#6c7086"
              fontSize="9"
              fontFamily="Fira Code, monospace"
              letterSpacing="1.2"
            >
              DATABASE
            </text>
            <text
              x="180" y="272"
              textAnchor="middle"
              fill="#a6e3a1"
              fontSize="12"
              fontFamily="Fira Code, monospace"
              fontWeight="700"
            >
              PostgreSQL
            </text>

            {/* ── Animated packets ── */}
            {/* Client → API: 2 packets staggered */}
            <circle r="4" fill="#89b4fa" filter="url(#glow-blue)">
              <animateMotion
                dur="1.1s"
                repeatCount="indefinite"
                begin="0s"
                path="M180,64 L180,110"
              />
              <animate
                attributeName="opacity"
                dur="1.1s"
                repeatCount="indefinite"
                begin="0s"
                values="0;1;1;0"
                keyTimes="0;0.08;0.88;1"
              />
            </circle>
            <circle r="4" fill="#89b4fa" filter="url(#glow-blue)">
              <animateMotion
                dur="1.1s"
                repeatCount="indefinite"
                begin="-0.55s"
                path="M180,64 L180,110"
              />
              <animate
                attributeName="opacity"
                dur="1.1s"
                repeatCount="indefinite"
                begin="-0.55s"
                values="0;1;1;0"
                keyTimes="0;0.08;0.88;1"
              />
            </circle>

            {/* API → Redis: 2 packets */}
            <circle r="3.5" fill="#f38ba8" filter="url(#glow-red)">
              <animateMotion
                dur="0.75s"
                repeatCount="indefinite"
                begin="-0.1s"
                path="M256,148 L293,148"
              />
              <animate
                attributeName="opacity"
                dur="0.75s"
                repeatCount="indefinite"
                begin="-0.1s"
                values="0;1;1;0"
                keyTimes="0;0.1;0.88;1"
              />
            </circle>
            <circle r="3.5" fill="#f38ba8" filter="url(#glow-red)">
              <animateMotion
                dur="0.75s"
                repeatCount="indefinite"
                begin="-0.48s"
                path="M256,148 L293,148"
              />
              <animate
                attributeName="opacity"
                dur="0.75s"
                repeatCount="indefinite"
                begin="-0.48s"
                values="0;1;1;0"
                keyTimes="0;0.1;0.88;1"
              />
            </circle>

            {/* API → PostgreSQL: 2 packets */}
            <circle r="4" fill="#a6e3a1" filter="url(#glow-green)">
              <animateMotion
                dur="1.2s"
                repeatCount="indefinite"
                begin="-0.25s"
                path="M180,172 L180,234"
              />
              <animate
                attributeName="opacity"
                dur="1.2s"
                repeatCount="indefinite"
                begin="-0.25s"
                values="0;1;1;0"
                keyTimes="0;0.08;0.88;1"
              />
            </circle>
            <circle r="4" fill="#a6e3a1" filter="url(#glow-green)">
              <animateMotion
                dur="1.2s"
                repeatCount="indefinite"
                begin="-0.85s"
                path="M180,172 L180,234"
              />
              <animate
                attributeName="opacity"
                dur="1.2s"
                repeatCount="indefinite"
                begin="-0.85s"
                values="0;1;1;0"
                keyTimes="0;0.08;0.88;1"
              />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
