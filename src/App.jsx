import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import InGamePage from "./pages/InGamePage";
import MainMenu from "./pages/MainMenu";
import { GameProvider } from "./contexts/game.context";
import UserGrantedPlayLayout from "./layouts/UserGrantedPlayLayout";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/main-menu" element={<MainMenu />} />
          <Route element={<UserGrantedPlayLayout />}>
            <Route path="/ingame" element={<InGamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
