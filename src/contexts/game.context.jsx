import { createContext, useState } from "react";

export const GameContext = createContext({
  room: "",
  orientation: "",
  players: [],
  setRoom: () => {},
  setOrientation: () => {},
  setPlayers: () => {},
});

export const GameProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [players, setPlayers] = useState([]);

  return (
    <GameContext.Provider
      value={{
        room,
        setRoom,
        orientation,
        setOrientation,
        players,
        setPlayers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
