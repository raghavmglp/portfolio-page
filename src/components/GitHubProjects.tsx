import { useEffect, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

const GITHUB_USERNAME = "raghavmglp";
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

interface GitHubRepository {
  id: number;
  name: string;
  default_branch: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

interface PortfolioMetadata {
  title?: string;
  description?: string;
  technologies?: string[];
  featured?: boolean;
}

interface PortfolioProject extends GitHubRepository {
  portfolio?: PortfolioMetadata;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

let projectsRequest: Promise<PortfolioProject[]> | null = null;

function metadataUrl(repository: GitHubRepository) {
  const branch = repository.default_branch
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${encodeURIComponent(repository.name)}/${branch}/.portfolio.json`;
}

function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

async function getPortfolioMetadata(repository: GitHubRepository) {
  try {
    const response = await fetch(metadataUrl(repository));
    if (!response.ok) return undefined;

    const value: unknown = await response.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return undefined;
    }

    const metadata = value as Record<string, unknown>;
    const technologies = Array.isArray(metadata.technologies)
      ? metadata.technologies
          .map(optionalText)
          .filter((item): item is string => Boolean(item))
      : undefined;

    return {
      title: optionalText(metadata.title),
      description: optionalText(metadata.description),
      technologies: technologies?.length ? technologies : undefined,
      featured:
        typeof metadata.featured === "boolean" ? metadata.featured : undefined,
    } satisfies PortfolioMetadata;
  } catch {
    return undefined;
  }
}

function getProjects() {
  if (!projectsRequest) {
    projectsRequest = fetch(GITHUB_REPOS_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub request failed");
        return response.json() as Promise<GitHubRepository[]>;
      })
      .then(async (repositories) => {
        const visibleRepositories = repositories
          .filter((repository) => !repository.fork && !repository.archived)
          .sort(
            (first, second) =>
              Date.parse(second.pushed_at) - Date.parse(first.pushed_at),
          );

        const projects = await Promise.all(
          visibleRepositories.map(async (repository) => ({
            ...repository,
            portfolio: await getPortfolioMetadata(repository),
          })),
        );

        return projects.sort(
          (first, second) =>
            Number(Boolean(second.portfolio?.featured)) -
              Number(Boolean(first.portfolio?.featured)) ||
            Date.parse(second.pushed_at) - Date.parse(first.pushed_at),
        );
      })
      .catch((error: unknown) => {
        projectsRequest = null;
        throw error;
      });
  }

  return projectsRequest;
}

function formatName(name: string) {
  return name.replaceAll(/[-_]/g, " ");
}

function formatRepositoryName(name: string) {
  return formatName(name).replaceAll(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

export default function GitHubProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getProjects()
      .then((repositories) => {
        if (isCurrent) setProjects(repositories);
      })
      .catch(() => {
        if (isCurrent) setHasError(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  if (isLoading) {
    return <p className="projects-status">Loading projects…</p>;
  }

  if (hasError) {
    return (
      <p className="projects-status">
        Projects are unavailable right now. View them directly on{" "}
        <a href={`https://github.com/${GITHUB_USERNAME}`}>GitHub</a>.
      </p>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => {
        const description =
          project.portfolio?.description ?? project.description;
        const technologies = project.portfolio?.technologies ?? [
          ...(project.language ? [project.language] : []),
          ...project.topics.filter(
            (topic) =>
              topic.toLowerCase() !== project.language?.toLowerCase(),
          ),
        ];

        return (
          <a
            className="project-card"
            href={project.html_url}
            key={project.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-card__heading">
              <h3>
                {project.portfolio?.title ?? formatRepositoryName(project.name)}
              </h3>
              <LuArrowUpRight aria-hidden="true" />
            </div>

            {description && <p>{description}</p>}

            <div className="project-card__meta">
              <div className="project-card__topics">
                {technologies.slice(0, 5).map((technology) => (
                  <span key={technology}>{formatName(technology)}</span>
                ))}
              </div>
              <time dateTime={project.pushed_at}>
                Updated {dateFormatter.format(new Date(project.pushed_at))}
              </time>
            </div>
          </a>
        );
      })}
    </div>
  );
}
