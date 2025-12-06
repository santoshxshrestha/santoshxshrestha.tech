import { GitHubRepo, formatDate } from "../lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
}

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Lua: "#000080",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Nix: "#7e7eff",
};

export default function ProjectCard({ repo }: ProjectCardProps) {
  const languageColor = repo.language
    ? languageColors[repo.language] || "#8b949e"
    : "#8b949e";

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-title">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
            {repo.name}
          </a>
        </h3>
        <div className="project-stats">
          <span className="stat">
            <i className="fa-solid fa-star"></i>
            {repo.stargazers_count}
          </span>
          <span className="stat">
            <i className="fa-solid fa-code-fork"></i>
            {repo.forks_count}
          </span>
        </div>
      </div>

      <p className="project-description">
        {repo.description || "No description available"}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="project-topics">
          {repo.topics.slice(0, 5).map((topic) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="project-footer">
        {repo.language && (
          <span className="language">
            <span
              className="language-dot"
              style={{ backgroundColor: languageColor }}
            ></span>
            {repo.language}
          </span>
        )}
        <span className="updated">Updated {formatDate(repo.updated_at)}</span>
      </div>

      {repo.homepage && (
        <div className="project-link">
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            Live Demo
          </a>
        </div>
      )}
    </div>
  );
}
