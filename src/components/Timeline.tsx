import amazonLogo from "../assets/amazon_logo.jpeg";
import asmlLogo from "../assets/asml_logo.jpeg";
import bitsLogo from "../assets/BITS_Pilani-Logo.svg";
import eltropyLogo from "../assets/eltropy_logo.jpeg";
import tueLogo from "../assets/tue.png";

interface TimelineEntry {
  logo: string;
  fullBleedLogo?: boolean;
  title: string;
  organization: string;
  period: string;
  description: string;
}

const ENTRIES: TimelineEntry[] = [
  {
    logo: asmlLogo,
    fullBleedLogo: true,
    title: "Data Science Intern",
    organization: "ASML",
    period: "Aug 2026 — Present",
    description: "Data science · Machine learning",
  },
  {
    logo: tueLogo,
    title: "MSc Computer Science & Engineering",
    organization: "Eindhoven University of Technology",
    period: "Sep 2025 — Present",
    description:
      "Data-intensive systems · Distributed systems · Big Data Management · ML engineering · Deep Learning",
  },
  {
    logo: eltropyLogo,
    fullBleedLogo: true,
    title: "Software Engineer, AI Team",
    organization: "Eltropy",
    period: "Jul 2024 — Jul 2025",
    description: "Golang · MongoDB · React · TypeScript · AWS S3 · Temporal",
  },
  {
    logo: eltropyLogo,
    fullBleedLogo: true,
    title: "Software Engineer Intern, AI Team",
    organization: "Eltropy",
    period: "Jan 2024 — Jun 2024",
    description: "React · TypeScript",
  },
  {
    logo: amazonLogo,
    fullBleedLogo: true,
    title: "SDE Intern, Retail Business Services",
    organization: "Amazon",
    period: "Jun 2023 — Dec 2023",
    description: "Java · AWS Lambda · SQS · SNS · QuickSight",
  },
  {
    logo: bitsLogo,
    title: "BE Computer Science & MSc Economics",
    organization: "BITS Pilani",
    period: "Aug 2019 — Jul 2024",
    description: "Computer science · Economics",
  },
];

export default function TimelineComponent() {
  return (
    <div className="career-list">
      {ENTRIES.map((entry) => (
        <article
          className="career-row"
          key={`${entry.organization}-${entry.title}`}
        >
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
                <p className="career-role">{entry.title}</p>
              </div>
            </div>
            <p className="career-stack">{entry.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
