import React, { useMemo } from "react";
import { Text } from "@/components/ui/typography";
import { contactInfo } from "@/constants/contact";

const PASTEL_COLORS = [
  // Matches bg-pink-100
  "bg-pink-100 dark:bg-rose-900/100",
  // Matches bg-blue-100
  "bg-orange-100 dark:bg-amber-900/100",
  // Matches bg-green-100
  "bg-green-100 dark:bg-emerald-900/100",
];

// 2. The Random Highlighter
const Highlight = ({ children }: { children: React.ReactNode }) => {
  const colorClass = useMemo(() => {
    // Selects a random color on mount/refresh
    return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
  }, []);

  return (
    <span
      className={`
        ${colorClass} 
        px-0.5 py-0.5 
        font-medium 
        inline-block mx-0.5 my-0.5 leading-none
      `}
    >
      {children}
    </span>
  );
};

function Home() {
  return (
    <div className="space-y-4 leading-relaxed">
      <Text className="text-[18px]">
        Hi! I'm <Highlight>Raghav</Highlight>.
      </Text>

      <Text className="text-[18px]">
        I'm currently pursuing a{" "}
        <Highlight>Master's Degree in Computer Science</Highlight> at the{" "}
        <Highlight>Technical University of Eindhoven</Highlight>. I'm interested
        in the intersection of <Highlight>systems architecture</Highlight> and{" "}
        <Highlight>machine learning</Highlight>. I have 2 years of professional
        experience in software engineering across a variety of technologies. My
        undergraduate studies were at the <Highlight>Birla Institute of Technology and Science (BITS), Pilani</Highlight>

        .
      </Text>

      <Text className="text-[18px]">
        You can view some of my personal projects below. I also write from time
        to time: if you're interested in reading some of my work, check out the
        blog! I'm always looking for new opportunites! If you'd like to get in
        touch with me, you can find my contact information at the bottom of the
        page.
      </Text>

      <div className="flex absolute bottom-4 left-0 right-0 justify-center items-center mt-8">
        <div className="flex gap-4">
          {contactInfo.map((contact) => (
            <a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group
                w-10 h-10
                ${contact.bg}
                flex flex-col items-center justify-center
                rounded-none
                transition-colors duration-200
                hover:bg-orange-500
              `}
            >
              <div className="flex justify-center">
                <div className="text-zinc-700 group-hover:text-white transition">
                  <contact.icon size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
