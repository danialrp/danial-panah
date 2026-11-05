import React, {useContext} from "react";
import "./ContentCommunity.scss";
import {contentSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function ContentCommunity() {
  const {isDark} = useContext(StyleContext);
  if (!contentSection.display) {
    return null;
  }
  const mode = isDark ? "content-dark" : "content-light";
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className={`main content-section ${mode}`} id="content">
        <h1 className="skills-heading">{contentSection.title}</h1>
        <p
          className={
            isDark ? "dark-mode content-subtitle" : "subTitle content-subtitle"
          }
        >
          {contentSection.subtitle}
        </p>

        <div className="content-stats">
          {contentSection.stats.map(stat => (
            <div className="content-stat" key={stat.label}>
              <span className="content-stat-value">{stat.value}</span>
              <span className="content-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <h2 className="content-reels-title">{contentSection.topReelsTitle}</h2>
        <div className="content-reels">
          {contentSection.topReels.map(reel => (
            <a
              className="content-reel"
              key={reel.url}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="content-reel-title">{reel.title}</span>
              <span className="content-reel-views">
                {reel.views} views <i className="fas fa-external-link-alt"></i>
              </span>
            </a>
          ))}
        </div>

        <div className="content-actions">
          <a
            className="content-cta"
            href={contentSection.cta.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> {contentSection.cta.text}
          </a>
          <p className="content-partnership">
            {contentSection.partnershipLabel}{" "}
            <a href={`mailto:${contentSection.partnershipEmail}`}>
              {contentSection.partnershipEmail}
            </a>
          </p>
        </div>
        {contentSection.asOf ? (
          <p className="content-asof">Figures as of {contentSection.asOf}</p>
        ) : null}
      </div>
    </Fade>
  );
}
