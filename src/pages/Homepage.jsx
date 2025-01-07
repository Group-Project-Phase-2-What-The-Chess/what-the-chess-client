import { useState } from "react";
import Modal from "../components/Modal";

export default function Homepage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [isSpectateModalOpen, setIsSpectateModalOpen] = useState(false);

  const handleClosePlayModal = () => {
    setIsPlayModalOpen(false);
  };
  const handleOpenPlayModal = () => {
    setIsPlayModalOpen(true);
  };

  const handleCloseSpectateModal = () => {
    setIsSpectateModalOpen(false);
  };
  const handleOpenSpectateModal = () => {
    setIsSpectateModalOpen(true);
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
                      <div className="flex-col gap-2 flex items-center">
                        <label className="font-semibold">Name</label>
                        <input
                          type="text"
                          className="rounded-md outline-none focus:outline-none px-1 border-black border w-40"
                        />
                      </div>
                      <div className="flex flex-col gap-2 pt-4 py-2 items-center">
                        <label className="font-semibold">Code Room</label>
                        <input
                          type="text"
                          className="rounded-md outline-none focus:outline-none border border-black px-1 w-40"
                        />
                      </div>
                      <div className="pt-8 gap-2 flex w-full justify-center">
                        <div>
                          <button className="rounded-md text-white bg-green-500 px-2 py-1">
                            Create Room
                          </button>
                        </div>
                        <div>
                          <button className="rounded-md bg-yellow-500 px-2 py-1">
                            Join Room
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
            <h1>OR</h1>
            <div className="py-2">
              <button
                className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2"
                onClick={handleOpenSpectateModal}
              >
                Spectate
              </button>
              {isSpectateModalOpen && (
                <Modal
                  modalName="Specatate"
                  handleCloseModal={handleCloseSpectateModal}
                  data={
                    <div className="text-center text-black">
                      <div className="flex-col gap-2 flex items-center">
                        <label className="font-semibold">Name</label>
                        <input
                          type="text"
                          className="rounded-md outline-none focus:outline-none px-1 border-black border w-40"
                        />
                      </div>
                      <div className="flex flex-col gap-2 pt-4 py-2 items-center">
                        <label className="font-semibold">Code Room</label>
                        <input
                          type="text"
                          className="rounded-md outline-none focus:outline-none border border-black px-1 w-40"
                        />
                      </div>
                      <div className="pt-8 gap-2 flex w-full justify-center">
                        <div>
                          <button className="rounded-md bg-yellow-500 px-2 py-1">
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
