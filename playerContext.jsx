

import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekbg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]); // Initialize with the first song
  const [playStatus, setPlaystatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current && !playStatus) {
      audioRef.current.play();
      setPlaystatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current && playStatus) {
      audioRef.current.pause();
      setPlaystatus(false);
    }
  };

  const playWithId = async (id) => {
    setTrack(songsData[id]);
    if (audioRef.current) {
      audioRef.current.play();
      setPlaystatus(true);
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlaystatus(true);
      }
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlaystatus(true);
      }
    }
  };

  const seekSong = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (e.nativeEvent.offsetX / seekbg.current.offsetWidth) * audioRef.current.duration;
    }
  };

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        seekBar.current.style.width = (audioRef.current.currentTime / audioRef.current.duration) * 100 + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = updateTime;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [audioRef, track]);

  const contextValue = {
    audioRef,
    seekbg,
    seekBar,
    track,
    playStatus,
    time,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return <PlayerContext.Provider value={contextValue}>{props.children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;
