import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";

export type ContactInfo = {
  label: string;
  link: string;
  icon: IconType;
  bg: string;
};

export const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    link: "mailto:raghavmtests@gmail.com",
    icon: FaEnvelope,
    bg: "bg-pink-100",
  },
  {
    label: "GitHub",
    link: "https://github.com/raghavmglp",
    icon: FaGithub,
    bg: "bg-blue-100",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/raghav-mangalapalli/",
    icon: FaLinkedin,
    bg: "bg-green-100",
  },
];
