import { ModeToggle } from "@/components/ui/mode-toggle";
import { Text } from "@/components/ui/typography";
import { tabs } from "@/constants/tabs";
import { useStore } from "@/store/useStore";

function Header() {
  const setCurrentTab = useStore((s) => s.setCurrentTab);

  return (
    <div className="flex items-center justify-between p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Text
          className="cursor-pointer font-bold"
          onClick={() => setCurrentTab("/home")}
        >
          Raghav Mangalapalli
        </Text>
      </div>

      <div className="flex items-center gap-6">
        {Object.entries(tabs)
          .filter(([key]) => key !== "HOME")
          .map(([key, value]) => (
            <button
              key={key}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setCurrentTab(value)}
            >
              {value}
            </button>
          ))}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
