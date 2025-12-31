import React, { useMemo } from "react";
import { Text } from "@/components/ui/typography";
import { contactInfo } from "@/constants/contact";

const PASTEL_COLORS = [
  "dark:text-rose-100 text-rose-900", // Soft Pink
  "dark:text-sky-100 text-sky-900", // Airy Blue
  "dark:text-emerald-100 text-emerald-900", // Fresh Green
  "dark:text-violet-100 text-violet-900", // Calm Purple
  "dark:text-amber-100 text-amber-900", // Warm Gold/Orange
  "dark:text-teal-100 text-teal-900", // Ocean Blue/Green
  "dark:text-fuchsia-100 text-fuchsia-900", // Vibrant Pink/Purple
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
    <div className="flex flex-col min-h-[80vh] space-y-4 leading-relaxed">
      {/* Content wrapper */}
      <div className="space-y-4">
        <Text className="text-[18px]">Hi! I'm Raghav.</Text>

        <Text className="text-[18px]">
          I'm currently pursuing a Master's Degree in Computer Science at the
          Technical University of Eindhoven. I'm interested in the intersection
          of systems architecture and machine learning. I have 2 years of
          professional experience in software engineering across a variety of
          technologies. My undergraduate studies were at the Birla Institute of
          Technology and Science (BITS), Pilani.
        </Text>

        <Text className="text-[18px]">
          You can view some of my personal projects below. I also write from
          time to time: if you're interested in reading some of my work, check
          out the blog! I'm always looking for new opportunites! If you'd like
          to get in touch with me, you can find my contact information at the
          bottom of the page.
        </Text>
      </div>

      <div className="flex justify-center items-center mt-4 pt-12 pb-4">
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
