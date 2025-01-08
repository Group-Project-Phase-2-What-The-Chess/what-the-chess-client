import { useState } from "react";
import Modal from "../components/Modal";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";

const socket = io("http://localhost:5000");

export default function Homepage() {
  const [isSpectateModalOpen, setIsSpectateModalOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleCloseSpectateModal = () => {
    setIsSpectateModalOpen(false);
  };
  const handleOpenSpectateModal = () => {
    setIsSpectateModalOpen(true);
  };

  const handlePlay = () => {
    const roomName = `room-${Math.random().toString(36).substr(2, 9)}`;
    socket.emit("createRoom", { roomName });
    navigate(`/game/${roomName}`);
  };

  const handleJoinRoom = () => {
    if (!roomCode) {
      alert("Please enter a room code!");
      return;
    }

    // Emit event untuk join ke room yang ada
    socket.emit("joinGame", { roomName: roomCode });
    socket.on("error", (message) => {
      alert(message);
    });
    navigate(`/game/${roomCode}`);
  };

  return (
    <div>
      <div className="bg-gray-900 h-[100vh] min-w-full">
        <div className="flex h-full items-center justify-center">
          <div className="text-white text-center">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold">What The Chess</h1>
              <h1 className="text-2xl font-semibold">
                Greetings, Knight of the Chessboard!
              </h1>
            </div>
            <div className="py-2">
              <button
                className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2"
                onClick={handlePlay}
              >
                Play
              </button>
            </div>
            <h1>OR</h1>
            <div className="py-2">
              <button
                className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2"
                onClick={handleOpenSpectateModal}
              >
                Join
              </button>
              {isSpectateModalOpen && (
                <Modal
                  modalName="Join Room"
                  handleCloseModal={handleCloseSpectateModal}
                  data={
                    <div className="text-center text-black">
                      <div className="flex flex-col gap-2 pt-4 py-2 items-center">
                        <label className="font-semibold">Code Room</label>
                        <input
                          type="text"
                          className="rounded-md outline-none focus:outline-none border border-black px-1 w-40"
                          value={roomCode}
                          onChange={(e) => setRoomCode(e.target.value)}
                        />
                      </div>
                      <div className="pt-8 gap-2 flex w-full justify-center">
                        <div>
                          <button
                            className="rounded-md bg-yellow-500 px-2 py-1"
                            onClick={handleJoinRoom}
                          >
                            Join Room
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
