import React, {useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import GithubCalendar from "../githubCalendar/GithubCalendar";
import GitlabCalendar from "../gitlabCalendar/GitlabCalendar";
import "./ActivityCharts.scss";

export default function ActivityCharts() {
  const {isDark} = useContext(StyleContext);

  return (
    <div className="activity-charts-wrap">
      <div className="activity-charts-grid">
        <div className={isDark ? "chart-card dark" : "chart-card"}>
          <GithubCalendar />
        </div>
        <div className={isDark ? "chart-card dark" : "chart-card"}>
          <GitlabCalendar />
        </div>
      </div>
    </div>
  );
}
