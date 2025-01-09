import { TextField } from "@mui/material";
import Modal from "../components/Modal";
import { useContext, useState } from "react";
import { socket } from "../utils/socketio";
import { GameContext } from "../contexts/game.context";
import { useNavigate } from "react-router";
import { GiQueenCrown } from "react-icons/gi";

export default function MainMenu() {
  const [openModalJoinRoom, setOpenModalJoinRoom] = useState(false);
  const [roomInput, setRoomInput] = useState(""); // input state
  const [roomError, setRoomError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  const { setRoom, setPlayers, setOrientation, setSpectators } =
    useContext(GameContext);
  const navigate = useNavigate();
  const data = "granted";

  const handleCreateRoom = () => {
    socket.emit("createRoom", (r) => {
      localStorage.setItem("access", data);
      console.log(r);
      setRoom(r);
      setOrientation("white");
      navigate("/ingame");
    });
  };

  const handleContinueJoinRoom = () => {
    if (!roomInput) return;

    socket.emit("joinRoom", { roomId: roomInput }, (response) => {
      if (response.error) {
        return setRoomError(response.message);
      }

      localStorage.setItem("access", data);
      setRoom(response?.roomId);
      setPlayers(response?.players);
      setSpectators(response?.spectators);
      setOrientation(response.players.length > 2 ? "" : "black");
      setOpenModalJoinRoom(false);
      navigate("/ingame");
    });
  };

  const hanldeExitMenu = () => {
    localStorage.removeItem("access", data);
    navigate("/");
  };

  return (
    <div>
      <Modal
        open={!usernameSubmitted}
        title="Username"
        contentText="Please enter your username"
        handleContinue={() => {
          if (!username) return localStorage.removeItem("access", data);
          socket.emit("username", username);
          setUsernameSubmitted(true);
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
      </Modal>

      <Modal
        open={openModalJoinRoom}
        handleClose={() => setOpenModalJoinRoom(false)}
        title="Join Room"
        contentText="Enter a valid room ID to join the room"
        handleContinue={handleContinueJoinRoom}
      >
        <TextField
          autoFocus
          margin="dense"
          id="room"
          label="Room ID"
          name="room"
          value={roomInput}
          required
          onChange={(e) => setRoomInput(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
          error={Boolean(roomError)}
          helperText={
            !roomError ? "Enter a room ID" : `Invalid room ID: ${roomError}`
          }
        />
      </Modal>
      <div className="bg-gray-900 h-[100vh] min-w-full">
        <div className="flex h-full items-center justify-center">
          <div className="text-white text-center">
            <div className="text-center py-20">
              <GiQueenCrown className="text-yellow-400 text-6xl w-full" />
              <h1 className="text-4xl font-bold">What The Chess</h1>
            </div>
            <div className="py-2">
              <button
                className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2"
                onClick={handleCreateRoom}
              >
                Create Room
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 items-center w-32 mx-auto text-gray-400 text-xs md:text-base">
              <hr className="border-gray-400" />
              <p className="text-center">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="py-2">
              <button
                className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2"
                onClick={() => setOpenModalJoinRoom(true)}
              >
                Join Room
              </button>
            </div>
            <div className="p-20">
              <button
                className="rounded-md font-semibold text-gray-900 bg-red-500 w-48 py-2"
                onClick={hanldeExitMenu}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
