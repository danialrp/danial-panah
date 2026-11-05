import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import {visibleSocialLinks} from "../../portfolio";

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
          {visibleSocialLinks.map((link, i) => (
            <React.Fragment key={link.key}>
              {i > 0 ? " · " : null}
              <a
                href={link.url}
                {...(link.url.startsWith("mailto:")
                  ? {}
                  : {target: "_blank", rel: "noreferrer"})}
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </p>
      </div>
    </Fade>
  );
}
