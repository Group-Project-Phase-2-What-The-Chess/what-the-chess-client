import { useState, useMemo, useCallback, useEffect, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { GameContext } from "../contexts/game.context";
import { socket } from "../utils/socketio";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";

export default function InGamePage() {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
  const [over, setOver] = useState("");
  const { room, players, orientation, spectators } = useContext(GameContext);
  const { setRoom, setPlayers, setOrientation, setSpectators } =
    useContext(GameContext);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const navigate = useNavigate();

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move);
        setFen(chess.fen());

        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());

        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            );
          } else if (chess.isDraw()) {
            setOver("Draw");
          } else {
            setOver("Game over");
          }
        }

        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    [chess]
  );

  function onDrop(sourceSquare, targetSquare) {
    const isSpectator = spectators.some(
      (spectator) => spectator.id === socket.id
    );

    if (isSpectator || chess.turn() !== orientation[0]) return false;

    if (players.length < 2) return false;

    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      promotion: "q",
    };

    const move = makeAMove(moveData);

    if (move === null) return false;

    socket.emit("move", {
      move,
      room,
    });

    return true;
  }

  const handleLeave = () => {
    socket.emit("leaveRoom", { roomId: room });
    navigate("/main-menu");
    cleanup();
  };

  useEffect(() => {
    socket.on("spectatorDisconnected", (data) => {
      setSpectators(data.spectators);
    });
  }, []);

  useEffect(() => {
    socket.on("playerDisconnected", () => {
      setIsLeaveModalOpen(true);
    });
  }, []);

  const handleCloseModal = () => {
    setIsLeaveModalOpen(false);
    cleanup();
    navigate("/main-menu");
  };

  const cleanup = useCallback(() => {
    setRoom("");
    setOrientation("");
    setPlayers("");
  }, []);

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      setPlayers(roomData.players);
    });
  }, []);

  useEffect(() => {
    socket.on("spectatorJoined", (roomData) => {
      setSpectators(roomData.spectators);
    });
  }, []);

  useEffect(() => {
    socket.on("move", (move) => {
      makeAMove(move); //
    });
  }, [makeAMove, spectators]);

  useEffect(() => {
    socket.on("closeRoom", ({ roomId }) => {
      console.log("closeRoom", roomId, room);
      if (roomId === room) {
        cleanup();
      }
      navigate("/main-menu");
    });
  }, [room, cleanup]);
  return (
    <>
      <div className="bg-gray-900 flex items-center min-h-screen min-w-full">
        <div className="container mx-auto w-[1200px]">
          <div className="flex flex-col justify-center items-center py-4">
            <div className="py-2">
              <h1 className="text-center text-4xl font-semibold text-white">
                What The Chess
              </h1>
            </div>
            <div className="rounded-md bg-slate-800 px-3 py-2">
              <h1 className="text-white">Room ID: {room}</h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <div className="rounded-md h-[450px] w-[300px] bg-slate-800 px-4">
              <div className="p-4 text-white">
                {players && (
                  <>
                    <ul className="text-2xl pb-2 font-semibold">Players :</ul>
                    {players?.map((el) => (
                      <li key={el.id}>{el.username}</li>
                    ))}
                    {spectators.length !== 0 && (
                      <>
                        <ul className="text-2xl font-semibold py-2">
                          Spectators :
                        </ul>
                        {spectators?.map((el) => (
                          <li key={el.id}>{el.username}</li>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="App">
              <div className="mx-auto w-[450px]">
                <Chessboard
                  position={fen}
                  onPieceDrop={onDrop}
                  boardOrientation={orientation}
                />
              </div>
            </div>
            <Modal
              open={Boolean(over)}
              title={over}
              contentText={over}
              handleContinue={() => {
                socket.emit("closeRoom", { roomId: room });
                cleanup();
                navigate("/main-menu");
              }}
            />
          </div>
          <div className="text-center p-4">
            <button
              className="rounded-md bg-red-600 text-white px-3 py-1"
              onClick={handleLeave}
            >
              Leave Game
            </button>

            <Modal
              open={isLeaveModalOpen}
              title="You Win !"
              contentText="Opponent leave the room"
              handleContinue={handleCloseModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
