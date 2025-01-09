import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GameContext = createContext({
  room: "",
  orientation: "",
  players: [],
  spectators: [],
  setRoom: () => {},
  setOrientation: () => {},
  setPlayers: () => {},
  setSpectators: () => {},
});

export const GameProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [players, setPlayers] = useState([]);
  const [spectators, setSpectators] = useState([]);

  return (
    <GameContext.Provider
      value={{
        room,
        setRoom,
        orientation,
        setOrientation,
        players,
        setPlayers,
        spectators,
        setSpectators,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.element,
};
