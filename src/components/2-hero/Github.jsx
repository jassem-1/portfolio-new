import React from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubContributions = () => {
  const username = "jassem-1"; // Replace with your GitHub username

  return (
    <div className="hidden xl:block mt-6 pt-6" style={{ textAlign: "center" }}>
      <GitHubCalendar username={username} />
    </div>
  );
};

export default GitHubContributions;
