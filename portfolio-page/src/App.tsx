import Header from "./pages/header";
import { ThemeProvider } from "./components/ui/theme-provider";
import BodyMain from "./pages/body/body-main";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <BodyMain/>
    </ThemeProvider>
  );
}

export default App;
