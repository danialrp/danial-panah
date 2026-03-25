import React, {useEffect, useState, useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./CodeAnimation.scss";

const CODE_LINES = [
  {indent: 0, tokens: [{text: "package ", type: "keyword"}, {text: "main", type: "var"}]},
  {indent: 0, tokens: []},
  {indent: 0, tokens: [{text: "type ", type: "keyword"}, {text: "Developer", type: "type"}, {text: " struct {", type: "punct"}]},
  {indent: 1, tokens: [{text: "Name     ", type: "prop"}, {text: "string", type: "keyword"}]},
  {indent: 1, tokens: [{text: "Role     ", type: "prop"}, {text: "string", type: "keyword"}]},
  {indent: 1, tokens: [{text: "Since    ", type: "prop"}, {text: "int", type: "keyword"}]},
  {indent: 1, tokens: [{text: "Stack    ", type: "prop"}, {text: "[]", type: "punct"}, {text: "string", type: "keyword"}]},
  {indent: 0, tokens: [{text: "}", type: "punct"}]},
  {indent: 0, tokens: []},
  {indent: 0, tokens: [{text: "func ", type: "keyword"}, {text: "main", type: "fn"}, {text: "() {", type: "punct"}]},
  {indent: 1, tokens: [{text: "d ", type: "var"}, {text: ":= ", type: "punct"}, {text: "Developer", type: "type"}, {text: "{", type: "punct"}]},
  {indent: 2, tokens: [{text: "Name:  ", type: "prop"}, {text: '"Danial Rahmani"', type: "string"}, {text: ",", type: "punct"}]},
  {indent: 2, tokens: [{text: "Role:  ", type: "prop"}, {text: '"Senior Backend Engineer"', type: "string"}, {text: ",", type: "punct"}]},
  {indent: 2, tokens: [{text: "Since: ", type: "prop"}, {text: "2015", type: "number"}, {text: ",", type: "punct"}]},
  {indent: 2, tokens: [{text: "Stack: ", type: "prop"}, {text: '[]', type: "punct"}, {text: "string", type: "keyword"}, {text: "{", type: "punct"}, {text: '"Go"', type: "string"}, {text: ", ", type: "punct"}, {text: '"Python"', type: "string"}, {text: ", ", type: "punct"}, {text: '"Laravel"', type: "string"}, {text: "},", type: "punct"}]},
  {indent: 1, tokens: [{text: "}", type: "punct"}]},
  {indent: 1, tokens: [{text: "d", type: "var"}, {text: ".", type: "punct"}, {text: "Build", type: "fn"}, {text: "()", type: "punct"}]},
  {indent: 0, tokens: [{text: "}", type: "punct"}]},
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
          <span className="titlebar-label">developer.go</span>
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
        <span className="badge badge-1">🐹 Go</span>
        <span className="badge badge-2">🐍 Python</span>
        <span className="badge badge-3">🌿 Laravel</span>
        <span className="badge badge-4">🐳 Docker</span>
      </div>
    </div>
  );
}
