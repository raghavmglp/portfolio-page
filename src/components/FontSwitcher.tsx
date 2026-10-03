import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-font";
const DEFAULT_FONT_ID = "geist";

const FONT_OPTIONS = [
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    family: "'JetBrains Mono', monospace",
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    family: "'Space Grotesk', sans-serif",
  },
  { id: "geist", label: "Geist", family: "Geist, sans-serif" },
  {
    id: "ibm-plex-sans",
    label: "IBM Plex Sans",
    family: "'IBM Plex Sans', sans-serif",
  },
  { id: "manrope", label: "Manrope", family: "Manrope, sans-serif" },
  { id: "inter", label: "Inter", family: "Inter, sans-serif" },
  { id: "dm-sans", label: "DM Sans", family: "'DM Sans', sans-serif" },
] as const;

function getInitialFontId() {
  const savedFont = localStorage.getItem(STORAGE_KEY);
  return FONT_OPTIONS.some(({ id }) => id === savedFont)
    ? savedFont!
    : DEFAULT_FONT_ID;
}

export default function FontSwitcher() {
  const [fontId, setFontId] = useState(getInitialFontId);
  const activeIndex = FONT_OPTIONS.findIndex(({ id }) => id === fontId);
  const activeFont = FONT_OPTIONS[activeIndex] ?? FONT_OPTIONS[0];

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--portfolio-font",
      activeFont.family,
    );
    localStorage.setItem(STORAGE_KEY, activeFont.id);

    return () => {
      document.documentElement.style.removeProperty("--portfolio-font");
    };
  }, [activeFont]);

  function showNextFont() {
    const nextIndex = (activeIndex + 1) % FONT_OPTIONS.length;
    setFontId(FONT_OPTIONS[nextIndex].id);
  }

  return (
    <Button
      data-temporary-font-switcher
      position="fixed"
      right={{ base: 3, md: 5 }}
      bottom={{ base: 3, md: 5 }}
      zIndex={200}
      size="sm"
      variant="outline"
      borderRadius={0}
      borderColor="border"
      bg="bg"
      boxShadow="md"
      onClick={showNextFont}
      aria-label={`Current font: ${activeFont.label}. Click to try the next font.`}
      title="Click to try the next font"
    >
      Aa · {activeFont.label}
    </Button>
  );
}
