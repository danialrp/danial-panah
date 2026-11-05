import React from "react";
import "./SocialMedia.scss";
import {visibleSocialLinks} from "../../portfolio";

// Icon per link key; order and visibility come from socialMediaLinks in portfolio.js.
const XIcon = () => (
  <span className="x-icon">
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.736-8.87L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  </span>
);

const icons = {
  github: {className: "github", icon: "fab fa-github"},
  gitlab: {className: "gitlab", icon: "fab fa-gitlab"},
  linkedin: {className: "linkedin", icon: "fab fa-linkedin-in"},
  instagram: {className: "instagram", icon: "fab fa-instagram"},
  youtube: {className: "youtube", icon: "fab fa-youtube"},
  facebook: {className: "facebook", icon: "fab fa-facebook-f"},
  medium: {className: "medium", icon: "fab fa-medium"},
  stackoverflow: {className: "stack-overflow", icon: "fab fa-stack-overflow"},
  kaggle: {className: "kaggle", icon: "fab fa-kaggle"},
  x: {className: "x-social", custom: XIcon},
  email: {className: "google", icon: "fas fa-envelope"}
};

export default function socialMedia() {
  if (!visibleSocialLinks.length) {
    return null;
  }
  return (
    <div className="social-media-div">
      {visibleSocialLinks.map(link => {
        const entry = icons[link.key];
        if (!entry) return null;
        const Custom = entry.custom;
        return (
          <a
            key={link.key}
            href={link.url}
            className={`icon-button ${entry.className}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            {Custom ? <Custom /> : <i className={entry.icon}></i>}
            <span></span>
          </a>
        );
      })}
    </div>
  );
}
