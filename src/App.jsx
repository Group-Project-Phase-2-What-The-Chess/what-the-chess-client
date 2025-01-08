import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import InGamePage from "./pages/InGamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game/:roomName" element={<InGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
