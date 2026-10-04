import { useEffect, useState } from "react";
import { LuPalette, LuX } from "react-icons/lu";

import { useColorMode } from "./ui/color-mode";

const STORAGE_KEY = "portfolio-dark-background";

const BACKGROUNDS = [
  { id: "charcoal", label: "Charcoal", color: "#17191c" },
  { id: "ink", label: "Ink", color: "#101214" },
  { id: "midnight", label: "Midnight", color: "#101827" },
  { id: "espresso", label: "Espresso", color: "#1c1816" },
  { id: "slate", label: "Slate", color: "#182027" },
  { id: "forest", label: "Forest", color: "#111c18" },
  { id: "aubergine", label: "Aubergine", color: "#1c151f" },
  { id: "deep-teal", label: "Deep teal", color: "#0e1c1e" },
] as const;

type BackgroundId = (typeof BACKGROUNDS)[number]["id"];

function isBackgroundId(value: string | null): value is BackgroundId {
  return BACKGROUNDS.some((background) => background.id === value);
}

export default function DarkBackgroundPicker() {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<BackgroundId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isBackgroundId(saved) ? saved : "charcoal";
  });

  useEffect(() => {
    document.documentElement.dataset.darkBackground = selected;
    localStorage.setItem(STORAGE_KEY, selected);
  }, [selected]);

  if (colorMode !== "dark") return null;

  return (
    <aside className="background-picker" aria-label="Dark background preview">
      {isOpen && (
        <div className="background-picker__panel">
          <div className="background-picker__heading">
            <div>
              <span>Dark background</span>
              <small>Choose a direction</small>
            </div>
            <button
              type="button"
              aria-label="Close background picker"
              onClick={() => setIsOpen(false)}
            >
              <LuX aria-hidden="true" />
            </button>
          </div>

          <div className="background-picker__options" role="radiogroup">
            {BACKGROUNDS.map((background) => (
              <button
                className="background-picker__option"
                data-selected={selected === background.id}
                key={background.id}
                type="button"
                role="radio"
                aria-checked={selected === background.id}
                onClick={() => setSelected(background.id)}
              >
                <span
                  className="background-picker__swatch"
                  style={{ backgroundColor: background.color }}
                  aria-hidden="true"
                />
                <span>{background.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="background-picker__toggle"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <LuPalette aria-hidden="true" />
        <span>BG</span>
      </button>
    </aside>
  );
}
