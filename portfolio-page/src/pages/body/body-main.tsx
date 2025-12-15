import { tabs } from "@/constants/tabs";
import { useStore } from "@/store/useStore";
import Home from "./home";
import Blog from "./blog/blog";
import Contact from "./contact";
import CV from "./cv";

function BodyMain() {
const currentTab = useStore((s) => s.currentTab);
  return (
    <div className="flex items-center justify-between p-4 max-w-3xl mx-auto">
      {currentTab == tabs.HOME && <Home />}
      {currentTab == tabs.BLOG && <Blog />}
      {currentTab == tabs.CV && <CV />}
      {currentTab == tabs.CONTACT && <Contact />}
    </div>
  );
}

export default BodyMain;
