"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { RxValue } from "react-icons/rx";
import { decrypt, encrypt } from "../lib/crypto";
const PlayerContext = createContext(undefined);
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
const initialState: State = {
  isPlaying: false,
  isMuted: false,
  currentSong: null,
  currentProgress: 0,
  currentDuration: 0,
  currentVolume: 1,
  currentSeek: 0,
};
export interface downloadUrl {
  quality: string;
  url: string;
}

export interface artists {
  id: number;
  name: string;
  role: string;
  image: [];
  type: "artist";
  url: string;
}

export interface searchResults {
  id: string;
  name: string;
  source?: "youtube";
  artists: { primary: artists[] };
  image: downloadUrl[];
  downloadUrl: downloadUrl[];
}
type Action =
  | { type: "SET_IS_PLAYING"; payload: boolean }
  | { type: "SET_IS_MUTED"; payload: boolean }
  | { type: "SET_CURRENT_SONG"; payload: searchResults | null }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_SEEK"; payload: number }
  | { type: "SET_DURATION"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_IS_MUTED":
      return { ...state, isMuted: action.payload };
    case "SET_CURRENT_SONG":
      return { ...state, currentSong: action.payload };
    case "SET_PROGRESS":
      return { ...state, currentProgress: action.payload };
    case "SET_DURATION":
      return { ...state, currentDuration: action.payload };
    case "SET_VOLUME":
      return { ...state, currentVolume: action.payload };
    case "SET_SEEK":
      return { ...state, currentSeek: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}
// export default function getURL(currentSong: searchResults) {
//   const currentSongUrl =
//     currentSong?.downloadUrl[currentSong.downloadUrl.length - 1]?.url;
//   const currentVideoUrl = currentSongUrl?.startsWith("http")
//     ? currentSongUrl
//     : `${process.env.STREAM_URL}/${currentSongUrl}` ||
//       "https://us-east-1.tixte.net/uploads/tanmay111-files.tixte.co/d61488c1ddafe4606fe57013728a7e84.jpg";

//   return currentVideoUrl;
// }
export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(
    typeof window !== "undefined" ? new Audio() : null
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const playerRef = useRef(null);
  const progress = useMemo(
    () => state.currentProgress,
    [state.currentProgress]
  );
  const duration = useMemo(
    () => state.currentDuration,
    [state.currentDuration]
  );
  const volume = useMemo(() => state.currentVolume, [state.currentVolume]);
  // const getVideoId = (song: searchResults) => {
  //   try {
  //     console.log("from the get video function",song);
  //     const data = decrypt(song?.downloadUrl?.at(-1)?.url || "");
  //     return data;
  //   } catch (error) {
  //     return "";
  //     console.log("error decyrpting the video id",error);
  //   }
  // };
 const getVideoId = (song: searchResults) => {
  try {
    console.log("Full song object:", song);
    console.log("downloadUrl array:", song?.downloadUrl);
    console.log("Last downloadUrl item:", song?.downloadUrl[song.downloadUrl.length - 1]);
    console.log("URL to decrypt:", song?.downloadUrl[song.downloadUrl.length - 1]?.url);
    
    const encryptedUrl = song?.downloadUrl[song.downloadUrl.length - 1]?.url || "";
    
    if (!encryptedUrl) {
      console.error("No encrypted URL found");
      return "";
    }
    
    console.log("Attempting to decrypt:", encryptedUrl);
    const data = decrypt(encryptedUrl);
    console.log("Decrypted result:", data);
    return data;
  } catch (error) {
    console.error("Error decrypting video ID:", error);
    return "";
  }
};

  const play = useCallback(async (song: searchResults) => {
  console.log("Song to play:", song);
  console.log("playerRef.current:", playerRef.current);
  
  dispatch({ type: "SET_CURRENT_SONG", payload: song });
  
  if (!playerRef.current) {
    console.error("YouTube player not initialized!");
    return;
  }
  
  console.log("playing youtube");
  
  try {
    const videoId = getVideoId(song);
    console.log("Decrypted video ID:", videoId);
    
    if (videoId) {
      //@ts-expect-error:expect error
      playerRef.current?.loadVideoById(videoId);
      //@ts-expect-error:expect error
      playerRef.current?.playVideo();

      const storedVolume = Number(localStorage.getItem("volume")) || 1;
      //@ts-expect-error:expect error
      playerRef.current?.setVolume(storedVolume * 100);
      
      dispatch({ type: "SET_IS_PLAYING", payload: true });
      console.log("loading and playing youtube");
    } else {
      console.error("Invalid or missing video ID");
    }
  } catch (error) {
    console.error("Error playing YouTube video:", error);
  }
}, []);
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    dispatch({ type: "SET_IS_PLAYING", payload: false });
  }, []);
  const resume = useCallback(() => {
    if (audioRef.current && state.currentSong) {
      audioRef.current
        .play()
        .then(() => {
          dispatch({ type: "SET_IS_PLAYING", payload: true });
        })
        .catch((e) => {
          console.error("Error in resuming Audio", e.message);
        });
    }
  }, [state.currentSong]);
  const PlayPause = useCallback(() => {
    if (state.isPlaying) {
      if (playerRef.current && state.currentSong?.source == "youtube") {
        try {
          playerRef.current.pauseVideo();
          if (state.currentProgress) {
            console.log("seeking to ", state.currentProgress);
            playerRef.current.seekTo(state.currentProgress);
          }
          dispatch({ type: "SET_IS_PLAYING", payload: false });
        } catch (e) {
          console.error("Error pausing Youtube Player", e);
        }
      }
      pause();
    } else {
      if (state.currentSong) {
        resume();
        if (playerRef.current && state.currentSong?.source == "youtube") {
          try {
            dispatch({ type: "SET_IS_PLAYING", payload: true });
            playerRef.current.playVideo();
            if (state.currentProgress) {
              console.log("seking to ", state.currentProgress);
              playerRef.current.seekTo(state.currentProgress);
            }
          } catch (e) {
            console.log("Error Playing Youtube Video", e);
          }
        }
      }
    }
  }, [
    state.isPlaying,
    state.currentSong,
    pause,
    resume,
    state.currentProgress,
  ]);

  const mute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      dispatch({ type: "SET_IS_MUTED", payload: true });
    }
  }, []);
  const unmute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      dispatch({ type: "SET_IS_MUTED", payload: false });
    }
  }, []);
  const handleVolumeChange = (value: number, save?: boolean) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      if (save) {
        localStorage.setItem("volume", String(value));
      }
    }
    if (playerRef.current) {
      playerRef.current.setVolume(value);
    }
    dispatch({ type: "SET_PROGRESS", payload: value });
  };
  const seek = useCallback(() => {
    if (audioRef.current) {
      if (playerRef.current) {
        try {
          playerRef.current.seekTo(RxValue, true);
        } catch (e) {
          console.error("Error seeking Youtube Player", e.message);
        }
      }
      console.log("seeking to", value);
      dispatch({ type: "SET_PROGRESS", payload: value });
      audioRef.current.currentTime = value;
    }
  }, []);
  const playNext = useCallback(() => {
    audioRef.current?.pause();
  }, []);
  const playPrev = useCallback(() => {
    audioRef.current?.pause();
  }, []);
  const mediaSession = useCallback(() => {
    const handleBlock = () => {
      return;
    };
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.currentSong?.name,
        artist: state.currentSong?.artists.primary[0].name,
        artwork: state.currentSong?.image?.map((img) => ({
          src: img.url,
        })),
      });
      navigator.mediaSession.setActionHandler("play", resume);
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("previoustrack", playPrev);
      navigator.mediaSession.setActionHandler("nexttrack", playNext);
      navigator.mediaSession.setActionHandler("seekto", (e) => {
        navigator.mediaSession.setActionHandler("seekbackward", handleBlock);
        navigator.mediaSession.setActionHandler("seekforward", handleBlock);
      });
    }
  }, [state.currentSong, playNext, playPrev, resume, pause, seek ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        PlayPause();
      }
      if ((e.ctrlKey || e.altKey) && e.key === "ArrowRight") {
        e.preventDefault();
        playNext();
      } else if ((e.ctrlKey || e.altKey) && e.key === "ArrowLeft") {
        e.preventDefault();
        playPrev();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [PlayPause, playNext, playPrev]);
  const SetProgress = useCallback((progress: number) => {
    dispatch({ type: "SET_PROGRESS", payload: progress });
  }, []);
  const setCurrentSong = useCallback((song: searchResults) => {
    dispatch({ type: "SET_CURRENT_SONG", payload: song });
  }, []);
  return (
    <PlayerContext.Provider
      value={{
        state,
        dispatch,
        play,
        pause,
        resume,
        mute,
        unmute,
        setVolume: handleVolumeChange,
        isPlaying: state.isPlaying,
        isMuted: state.isMuted,
        volume,
        currentSong: state.currentSong,
        progress,
        SetProgress,
        playNext,
        playPrev,
        seek,
        duration,
        audioRef,
        setCurrentSong,
        playerRef,
        PlayPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
