import React, {useContext, useEffect, useState} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./StackAnimation.scss";
import {SiPython, SiPytorch, SiLangchain} from "react-icons/si";

const SERVICES = [
  {name: "llm-detector",   lang: "Claude",    base: 640,  range: 220},
  {name: "vector-cache",   lang: "pgvector",  base: 3.2,  range: 1.4},
  {name: "stream-ingest",  lang: "NATS",      base: 0.4,  range: 0.5},
];

const TECHS = [
  {
    name: "Python",
    color: "#FFD43B",
    glowColor: "rgba(255, 212, 59, 0.18)",
    Icon: SiPython,
    role: "LLM Apps & Agents",
    desc: "Tool calling · Evals · FastAPI",
  },
  {
    name: "PyTorch",
    color: "#EE4C2C",
    glowColor: "rgba(238, 76, 44, 0.22)",
    Icon: SiPytorch,
    role: "Fine-Tuning",
    desc: "LoRA/QLoRA · Hugging Face · MLflow",
  },
  {
    name: "LangChain",
    color: "#7bd389",
    glowColor: "rgba(123, 211, 137, 0.22)",
    Icon: SiLangchain,
    role: "RAG & Orchestration",
    desc: "Embeddings · Reranking · MCP",
  },
];

export default function StackAnimation() {
  const {isDark} = useContext(StyleContext);
  const [latencies, setLatencies] = useState(SERVICES.map(s => s.base));

  useEffect(() => {
    const t = setInterval(() => {
      setLatencies(SERVICES.map(s =>
        parseFloat((s.base + Math.random() * s.range).toFixed(1))
      ));
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`stack-anim-wrapper${isDark ? " dark" : ""}`}>
      <div className="stack-window">
        {/* Title bar */}
        <div className="stack-titlebar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="titlebar-label">ai.stack</span>
        </div>

        {/* Cards */}
        <div className="stack-body">
          {TECHS.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-card"
              style={{
                "--brand": tech.color,
                "--glow": tech.glowColor,
                "--delay": `${i * 0.2}s`,
              }}
            >
              <div className="tech-logo">
                <tech.Icon size={38} color={tech.color} aria-label={tech.name} />
              </div>
              <div className="tech-info">
                <div className="tech-name-row">
                  <span className="tech-name" style={{color: tech.color}}>
                    {tech.name}
                  </span>
                  <span className="tech-role">{tech.role}</span>
                </div>
                <span className="tech-desc">{tech.desc}</span>
              </div>
            </div>
          ))}

          {/* Health monitor */}
          <div className="health-monitor">
            <div className="health-header">
              <span className="live-dot" />
              <span className="health-title">SERVICES</span>
              <span className="health-uptime">uptime 99.98%</span>
            </div>
            {SERVICES.map((svc, i) => (
              <div key={svc.name} className="health-row">
                <span className="svc-status-dot" />
                <span className="svc-name">{svc.name}</span>
                <span className="svc-lang">{svc.lang}</span>
                <span className="svc-ok">OK</span>
                <span className="svc-latency">
                  {latencies[i].toFixed(1)}
                  <span className="svc-ms">ms</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
