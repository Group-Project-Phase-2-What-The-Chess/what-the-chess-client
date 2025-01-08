import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import io from "socket.io-client";
import { useParams } from "react-router";

const socket = io("http://localhost:5000");

export default function InGamePage() {
const { room } = useParams();
const [board, setBoard] = useState("start"); // Gunakan FEN default "start" jika belum ada
const [playerRole, setPlayerRole] = useState(null);
const [gameOver, setGameOver] = useState(false);

useEffect(() => {
socket.emit("joinRoom", { roomName: room });

    // Mendengarkan perbaruan papan catur
    socket.on("boardState", (fen) => {
      if (fen && typeof fen === "string") {
        setBoard(fen); // Mengupdate posisi papan catur dengan FEN yang diterima
      } else {
        console.error("Invalid FEN received:", fen);
      }
    });

    // Mendengarkan peran pemain (White / Black)
    socket.on("PlayerRole", (role) => {
      setPlayerRole(role);
    });

    // Mendengarkan gerakan dari pemain lain
    socket.on("move", (move) => {
      console.log("Move received:", move);
    });

    socket.on("gameOver", () => {
      setGameOver(true);
    });

    return () => {
      socket.off("boardState");
      socket.off("PlayerRole");
      socket.off("move");
      socket.off("gameOver");
    };

}, [room]);

socket.on("error", (message) => {
alert(message);
});

const handleMove = (move) => {
if (playerRole) {
socket.emit("move", move, room); // Mengirimkan gerakan ke server
}
};

return (
<div>
<h1>Chess Game</h1>
{gameOver ? (
<p>Game Over</p> // Menampilkan pesan Game Over
) : (
<Chessboard
position={board} // Menampilkan papan dengan posisi FEN
onPieceDrop={handleMove} // Menangani pergerakan bidak
arePiecesDraggable={playerRole === "w" || playerRole === "b"} // Hanya bisa bergerak jika giliran pemain
/>
)}
</div>
);
}
