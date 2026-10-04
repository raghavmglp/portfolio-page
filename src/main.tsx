import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/geist";
import "@fontsource/jetbrains-mono";
import "@fontsource/newsreader/latin-400.css";
import "@fontsource/newsreader/latin-400-italic.css";
import "@fontsource/newsreader/latin-500.css";
import "@fontsource/newsreader/latin-600.css";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider defaultTheme="dark">
      <App />
    </Provider>
  </StrictMode>,
);
