import { TextField } from "@mui/material";
import Modal from "../components/Modal";
import { Socket } from "socket.io-client";
import { useState } from "react";
import { socket } from "../utils/socketio";

export default function Homepage() {
  const [openModalJoinRoom, setOpenModalJoinRoom] = useState(false);
  const [roomInput, setRoomInput] = useState(""); // input state
  const [roomError, setRoomError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);

  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [players, setPlayers] = useState([]);

  const handleCreateRoom = () => {
    socket.emit("createRoom", (r) => {
      console.log(r);
      setRoom(r);
      setOrientation("white");
    });
  };

  return (
    <div>
      <Modal
        open={!usernameSubmitted}
        title="Pick a username"
        contentText="Please select a username"
        handleContinue={() => {
          if (!username) return;
          Socket.emit("username", username);
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
        title="Code Room"
        contentText="Enter a valid room ID to join the room"
        handleContinue={() => {
          if (!roomInput) return;
          socket.emit("joinRoom", { roomId: roomInput }, (r) => {
            if (r.error) return setRoomError(r.message);
            console.log("response:", r);
            setRoom(r?.roomId);
            setPlayers(r?.players);
            setOrientation("black");
            setOpenModalJoinRoom(false);
          });
        }}
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
            <h1>OR</h1>
            <div className="py-2">
              <button
                className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2"
                onClick={() => setOpenModalJoinRoom(true)}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
