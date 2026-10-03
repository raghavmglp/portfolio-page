import { Box, Separator } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
// import FontSwitcher from "./components/FontSwitcher";
import HomePage from "./pages/HomePage";
import { useNavStore } from "./store/navStore";

function App() {
  const { activeTab } = useNavStore();

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="bg"
        borderBottom="1px solid"
        borderColor="border"
        backdropFilter="blur(8px)"
      >
        <Box maxW="3xl" mx="auto" px={{ base: 4, md: 8 }}>
          <NavBar />
        </Box>
      </Box>
      <Box maxW="3xl" mx="auto" px={{ base: 4, md: 8 }} pt={16}>
        <Separator size={"lg"} />
        {activeTab === "home" && <HomePage />}
      </Box>
      {/* Temporary font comparison control; uncomment to restore it. */}
      {/* <FontSwitcher /> */}
    </>
  );
}

export default App;
