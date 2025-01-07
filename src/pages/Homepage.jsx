import { useState } from "react";
import Modal from "../components/Modal";

export default function Homepage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  const handleClosePlayModal = () => {
    setIsPlayModalOpen(false);
  };
  const handleOpenPlayModal = () => {
    setIsPlayModalOpen(true);
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
                onClick={handleOpenPlayModal}
              >
                Play
              </button>
              {isPlayModalOpen && (
                <Modal
                  modalName="Play Chess"
                  handleCloseModal={handleClosePlayModal}
                  data={
                    <div className="text-center text-black">
                      <div className="flex-col flex">
                        <label>Name</label>
                        <input type="text" className="rounded-md border w-40" />
                      </div>
                      <div className="flex flex-col">
                        <label>Code Room:</label>
                        <input type="text" className="rounded-md border w-40" />
                      </div>
                      <div>
                        <button>Create Room</button>
                        <button>Join Room</button>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
            <h1>OR</h1>
            <div className="py-2">
              <button className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2">
                Spectate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
