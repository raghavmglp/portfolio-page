import { Box, Image, Timeline } from "@chakra-ui/react";

import bitsLogo from "../assets/BITS_Pilani-Logo.svg";
import amazonLogo from "../assets/amazon_logo.jpeg";
import asmlLogo from "../assets/asml_logo.jpeg";
import tueLogo from "../assets/tue.png";
import eltropyLogo from "../assets/eltropy_logo.jpeg";

interface TimelineEntry {
  icon: React.ReactNode;
  fullBleedIcon?: boolean;
  title: string;
  organization: string;
  period: string;
  description: string;
}

const logoImg = (src: string, fullBleed = false) => (
  <Image src={src} alt="" boxSize="full" objectFit="contain" borderRadius={fullBleed ? 0 : "sm"} />
);

const ENTRIES: TimelineEntry[] = [
  {
    icon: logoImg(asmlLogo, true),
    fullBleedIcon: true,
    title: "Data Science Intern",
    organization: "ASML",
    period: "Aug 2026 – Present",
    description: "",
  },
  {
    icon: logoImg(tueLogo),
    title: "MSc Computer Science & Engineering",
    organization: "Eindhoven University of Technology",
    period: "Sep 2025 – Present",
    description: "Data-Intensive Systems · Distributed Systems · ML Engineering · ML for Industry · Foundations of AI",
  },
  {
    icon: logoImg(eltropyLogo, true),
    fullBleedIcon: true,
    title: "Software Engineer, AI Team",
    organization: "Eltropy",
    period: "Jul 2024 – Jul 2025",
    description: "Golang · MongoDB · React · TypeScript · AWS S3 · Temporal",
  },
  {
    icon: logoImg(eltropyLogo, true),
    fullBleedIcon: true,
    title: "Software Engineer Intern, AI Team",
    organization: "Eltropy",
    period: "Jan 2024 – Jun 2024",
    description: "React · TypeScript",
  },
  {
    icon: logoImg(amazonLogo, true),
    fullBleedIcon: true,
    title: "SDE Intern, Retail Business Services",
    organization: "Amazon",
    period: "Jun 2023 – Dec 2023",
    description: "Java · AWS Lambda · SQS · SNS · QuickSight",
  },
  {
    icon: logoImg(bitsLogo),
    title: "BE Computer Science & MSc Economics",
    organization: "BITS, Pilani",
    period: "Aug 2019 – Jul 2024",
    description: "Computer Science · Economics",
  },
];

export default function TimelineComponent() {
  return (
    <Box maxW="2xl" mx="auto">
      <Timeline.Root>
        {ENTRIES.map((entry, i) => (
          <Timeline.Item key={i}>
            <Timeline.Connector style={{ width: "44px" }}>
              <Timeline.Separator />
              <Timeline.Indicator
                bg="white"
                _light={{ border: "1px solid", borderColor: "black" }}
                borderRadius="0"
                p={entry.fullBleedIcon ? 0 : 1}
                style={{ width: "44px", height: "44px" }}
              >
                {entry.icon}
              </Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content pb={14}>
              <Timeline.Title>{entry.organization}</Timeline.Title>
              <Timeline.Description>{entry.title} · <strong>{entry.period}</strong></Timeline.Description>
              {/* <Wrap gap={1} mt={2}>
                {entry.description.split(" · ").map((skill) => (
                  <Tag.Root key={skill} size="sm" variant="surface" borderRadius="0">
                    <Tag.Label fontSize="xs">{skill}</Tag.Label>
                  </Tag.Root>
                ))}
              </Wrap> */}
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    </Box>
  );
}
