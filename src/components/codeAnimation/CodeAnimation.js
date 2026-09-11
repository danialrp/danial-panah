import React, {useEffect, useState, useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./CodeAnimation.scss";
import {SiPython, SiPytorch, SiLangchain, SiDocker} from "react-icons/si";

const CODE_LINES = [
  {indent: 0, tokens: [{text: "from ", type: "keyword"}, {text: "anthropic", type: "var"}, {text: " import ", type: "keyword"}, {text: "Anthropic", type: "type"}]},
  {indent: 0, tokens: []},
  {indent: 0, tokens: [{text: "client ", type: "var"}, {text: "= ", type: "punct"}, {text: "Anthropic", type: "type"}, {text: "()", type: "punct"}]},
  {indent: 0, tokens: []},
  {indent: 0, tokens: [{text: "def ", type: "keyword"}, {text: "triage", type: "fn"}, {text: "(alert: ", type: "punct"}, {text: "MarketAlert", type: "type"}, {text: ") -> ", type: "punct"}, {text: "Verdict", type: "type"}, {text: ":", type: "punct"}]},
  {indent: 1, tokens: [{text: "window ", type: "var"}, {text: "= ", type: "punct"}, {text: "fetch_klines", type: "fn"}, {text: "(alert.symbol, minutes=", type: "punct"}, {text: "30", type: "number"}, {text: ")", type: "punct"}]},
  {indent: 1, tokens: [{text: "result ", type: "var"}, {text: "= ", type: "punct"}, {text: "client.messages.create", type: "fn"}, {text: "(", type: "punct"}]},
  {indent: 2, tokens: [{text: "model", type: "prop"}, {text: "=", type: "punct"}, {text: '"claude-opus-5"', type: "string"}, {text: ",", type: "punct"}]},
  {indent: 2, tokens: [{text: "tools", type: "prop"}, {text: "=[", type: "punct"}, {text: "compare_pairs", type: "var"}, {text: ", ", type: "punct"}, {text: "orderbook_depth", type: "var"}, {text: "],", type: "punct"}]},
  {indent: 2, tokens: [{text: "messages", type: "prop"}, {text: "=[{", type: "punct"}, {text: '"role"', type: "string"}, {text: ": ", type: "punct"}, {text: '"user"', type: "string"}, {text: ", ", type: "punct"}, {text: '"content"', type: "string"}, {text: ": window}],", type: "punct"}]},
  {indent: 1, tokens: [{text: ")", type: "punct"}]},
  {indent: 1, tokens: [{text: "return ", type: "keyword"}, {text: "Verdict", type: "type"}, {text: ".parse", type: "fn"}, {text: "(result)", type: "punct"}]},
  {indent: 0, tokens: []},
  {indent: 0, tokens: [{text: "verdict ", type: "var"}, {text: "= ", type: "punct"}, {text: "triage", type: "fn"}, {text: "(alert)", type: "punct"}]},
  {indent: 0, tokens: [{text: "if ", type: "keyword"}, {text: "verdict.level ", type: "var"}, {text: "== ", type: "punct"}, {text: '"escalate"', type: "string"}, {text: ":", type: "punct"}]},
  {indent: 1, tokens: [{text: "notify_analyst", type: "fn"}, {text: "(verdict)", type: "punct"}]},
];

export default function CodeAnimation() {
  const {isDark} = useContext(StyleContext);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleLines < CODE_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(v => !v);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  // Restart animation loop
  useEffect(() => {
    if (visibleLines === CODE_LINES.length) {
      const restartTimer = setTimeout(() => {
        setVisibleLines(0);
      }, 3500);
      return () => clearTimeout(restartTimer);
    }
  }, [visibleLines]);

  return (
    <div className={`code-anim-wrapper${isDark ? " dark" : ""}`}>
      <div className="code-window">
        <div className="code-titlebar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="titlebar-label">triage.py</span>
        </div>
        <div className="code-body">
          {CODE_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="code-line">
              <span className="line-num">{i + 1}</span>
              <span className="line-content" style={{paddingLeft: `${line.indent * 16}px`}}>
                {line.tokens.map((token, j) => (
                  <span key={j} className={`token-${token.type}`}>{token.text}</span>
                ))}
                {i === visibleLines - 1 && (
                  <span className={`cursor${showCursor ? " visible" : ""}`}>|</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="floating-badges">
        <span className="badge badge-1"><SiPython className="badge-icon" color="#FFD43B" /> Python</span>
        <span className="badge badge-2"><SiPytorch className="badge-icon" color="#EE4C2C" /> PyTorch</span>
        <span className="badge badge-3"><SiLangchain className="badge-icon" color="#1C3C3C" /> LangChain</span>
        <span className="badge badge-4"><SiDocker className="badge-icon" color="#2496ED" /> Docker</span>
      </div>
    </div>
  );
}
