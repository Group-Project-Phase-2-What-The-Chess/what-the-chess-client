import { TextField } from "@mui/material";
import Modal from "../components/Modal";
import { Socket } from "socket.io-client";
import { useState } from "react";

export default function Homepage() {
  const [username, setUsername] = useState("");

  // indicates if a username has been submitted
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  return (
    <div>
      <Modal
        open={!usernameSubmitted} // leave open if username has not been selected
        title="Pick a username" // Title of dialog
        contentText="Please select a username" // content text of dialog
        handleContinue={() => {
          // fired when continue is clicked
          if (!username) return; // if username hasn't been entered, do nothing
          Socket.emit("username", username); // emit a websocket event called "username" with the username as data
          setUsernameSubmitted(true); // indicate that username has been submitted
        }}
      >
        <TextField // Input
          autoFocus // automatically set focus on input (make it active).
          margin="dense"
          id="username"
          label="Username"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)} // update username state with value
          type="text"
          fullWidth
          variant="standard"
        />
      </Modal>
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
              <button className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2">
                Play
              </button>
            </div>
            <h1>OR</h1>
            <div className="py-2">
              <button className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
