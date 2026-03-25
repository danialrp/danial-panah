import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  const textClass = isDark ? "dark-mode footer-text" : "footer-text";
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={textClass} style={{fontSize: "17px"}}>
          &copy; 2015 – {new Date().getFullYear()} Danial Panah
        </p>
        <p className={textClass} style={{fontSize: "15px"}}>
          <a href="https://github.com/danialrp" target="_blank" rel="noreferrer">
            GitHub
          </a>
          {" · "}
          <a href="https://www.linkedin.com/in/danialrp/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {" · "}
          <a href="https://x.com/DanialPanah" target="_blank" rel="noreferrer">
            𝕏
          </a>
          {" · "}
          <a href="mailto:me@danialrp.com">Email</a>
        </p>
      </div>
    </Fade>
  );
}
