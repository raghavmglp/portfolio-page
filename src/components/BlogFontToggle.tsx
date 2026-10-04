import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-blog-font";

type BlogFont = "serif" | "sans";

export default function BlogFontToggle() {
  const [font, setFont] = useState<BlogFont>(() => {
    return localStorage.getItem(STORAGE_KEY) === "sans" ? "sans" : "serif";
  });

  useEffect(() => {
    document.documentElement.dataset.blogFont = font;
    localStorage.setItem(STORAGE_KEY, font);
  }, [font]);

  const nextFont = font === "serif" ? "sans" : "serif";

  return (
    <button
      className="blog-font-toggle"
      type="button"
      onClick={() => setFont(nextFont)}
      aria-label={`Use ${nextFont} font`}
      title={`Switch to ${nextFont}`}
    >
      <span aria-hidden="true">Aa</span>
      {font === "serif" ? "Serif" : "Sans"}
    </button>
  );
}
