import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import InGamePage from "./pages/InGamePage";
import MainMenu from "./pages/MainMenu";
import { GameProvider } from "./contexts/game.context";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/ingame" element={<InGamePage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
