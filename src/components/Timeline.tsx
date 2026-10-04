import amazonLogo from "../assets/amazon_logo.jpeg";
import asmlLogo from "../assets/asml_logo.jpeg";
import bitsLogo from "../assets/BITS_Pilani-Logo.svg";
import eltropyLogo from "../assets/eltropy_logo.jpeg";
import tueLogo from "../assets/tue.png";

interface TimelineRole {
  title: string;
  period?: string;
  description: string;
}

interface TimelineEntry {
  category: "experience" | "education";
  logo: string;
  fullBleedLogo?: boolean;
  organization: string;
  period: string;
  roles: TimelineRole[];
}

const ENTRIES: TimelineEntry[] = [
  {
    category: "experience",
    logo: asmlLogo,
    fullBleedLogo: true,
    organization: "ASML",
    period: "Aug 2026 — Present",
    roles: [
      {
        title: "Data Science Intern",
        description: "Data science · Machine learning",
      },
    ],
  },
  {
    category: "education",
    logo: tueLogo,
    organization: "Eindhoven University of Technology",
    period: "Sep 2025 — Present",
    roles: [
      {
        title: "MSc Computer Science & Engineering",
        description:
          "Data-intensive systems · Distributed systems · Big Data Management · ML engineering · Deep Learning",
      },
    ],
  },
  {
    category: "experience",
    logo: eltropyLogo,
    fullBleedLogo: true,
    organization: "Eltropy",
    period: "Jan 2024 — Jul 2025",
    roles: [
      {
        title: "Software Engineer, AI Team",
        period: "Jul 2024 — Jul 2025",
        description:
          "Golang · MongoDB · React · TypeScript · AWS S3 · Temporal",
      },
      {
        title: "Software Engineer Intern, AI Team",
        period: "Jan 2024 — Jun 2024",
        description: "React · TypeScript",
      },
    ],
  },
  {
    category: "experience",
    logo: amazonLogo,
    fullBleedLogo: true,
    organization: "Amazon",
    period: "Jun 2023 — Dec 2023",
    roles: [
      {
        title: "SDE Intern, Retail Business Services",
        description: "Java · AWS Lambda · SQS · SNS · QuickSight",
      },
    ],
  },
  {
    category: "education",
    logo: bitsLogo,
    organization: "BITS Pilani",
    period: "Aug 2019 — Jul 2024",
    roles: [
      {
        title: "BE Computer Science & MSc Economics",
        description: "Computer science · Economics",
      },
    ],
  },
];

interface TimelineComponentProps {
  category: TimelineEntry["category"];
}

export default function TimelineComponent({
  category,
}: TimelineComponentProps) {
  const entries = ENTRIES.filter((entry) => entry.category === category);

  return (
    <div className="career-list">
      {entries.map((entry) => (
        <article className="career-row" key={entry.organization}>
          <p className="career-period">{entry.period}</p>
          <div className="career-detail">
            <div className="career-heading">
              <div
                className={`career-logo${entry.fullBleedLogo ? " career-logo--full" : ""}`}
              >
                <img src={entry.logo} alt="" aria-hidden="true" />
              </div>
              <div>
                <h3>{entry.organization}</h3>
                {entry.roles.length === 1 && (
                  <p className="career-role">{entry.roles[0].title}</p>
                )}
              </div>
            </div>

            {entry.roles.length === 1 ? (
              <p className="career-stack">{entry.roles[0].description}</p>
            ) : (
              <div className="career-progression">
                {entry.roles.map((role) => (
                  <div className="career-progression__role" key={role.title}>
                    <p className="career-progression__title">{role.title}</p>
                    {role.period && (
                      <p className="career-progression__period">{role.period}</p>
                    )}
                    <p className="career-progression__stack">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
