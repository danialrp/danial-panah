import React from "react";
import "./Progress.scss";
import {techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import StackAnimation from "../../components/stackAnimation/StackAnimation";

export default function StackProgress() {
  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => {
              const progressStyle = {
                width: exp.progressPercentage
              };
              return (
                <div key={i} className="skill">
                  <p>{exp.Stack}</p>
                  <div className="meter">
                    <span style={progressStyle}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            <StackAnimation />
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
