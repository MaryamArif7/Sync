"use client";
import { usePlayerContext} from "../../../store/PlayerContext";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import ProgressBar from "./ProgressBar";
import Controller from "./Controller";
import PLayerCover from "./PLayerCover";
import { useUserContext } from "../../../store/UserContext";

const formatArtistName = (artists: artists[]) => {
  return artists?.[0]?.name || "Unknown";
};
function MemoPLayer() {
  
  const { currentSong } = usePlayerContext();

  const chatVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

 


  return (
    <div className=" relative hide-scrollbar max-md:w-full max-md:rounded-none max-md:border-none overflow-y-scroll w-1/2 backdrop-blur-lg md:h-full border border-white/15 flex-grow rounded-2xl p-8 pt-11 md:px-5 flex flex-col items-center justify-between px-4 gap-[2.5dvh]">
      

      <div
      
        className="w-full h-full flex flex-col items-center justify-center gap-[2.5dvh]"
      >
        <PLayerCover />

        <div className=" text-center w-full -mt-2 items-center justify-center flex flex-col text-sm">
          <p
            title={currentSong?.name || ""}
            className="title text-lg font-medium w-60 truncate"
          >
            {parse(currentSong?.name || "Not Playing")}
          </p>
          <p
            title={
              (currentSong &&
                formatArtistName(currentSong?.artists?.primary)) ||
              "Unknown"
            }
            className="artist text-xs w-56 text-zinc-300 truncate"
          >
            {(currentSong && formatArtistName(currentSong?.artists?.primary)) ||
              "Unknown"}
          </p>
        </div>
        <Controller />
        <ProgressBar />

      
      </div>
    </div>
  );
}
const Player = React.memo(MemoPLayer);
export default Player;
