import React, { useContext } from "react";
import { Player } from "./components/player";
import { Display } from "./components/display";
import { PlayerContext } from "./context/playerContext";
import Sidebar from "./components/sidebar";

function App() {
  const { audioRef, track } = useContext(PlayerContext); // Context is now working

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar/>
        <Display />
      </div>
      <Player />
      {/* Ensure track.file points to the correct file path */}
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
}

export default App;
