import { ModeToggle } from "@/components/ui/mode-toggle";
import { Text } from "@/components/ui/typography";
import { tabs } from "@/constants/tabs";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <Text
          className="cursor-pointer font-bold text-[20px]"
          onClick={() => navigate("/")}
          
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
              className="text-[20px] font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => navigate("/blog")}
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
