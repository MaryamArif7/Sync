
import {
  IoMdPause,
  IoMdPlay,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdVolumeHigh,
} from "react-icons/io";

export const Player = () => {
  return (
    <div className="w-full bg-black backdrop-blur-xl text-white px-2 py-2">
      <div className="max-w-[95%] mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
       
        <div className="flex-1 max-w-[500px] flex flex-col gap-2">
          <div className="flex items-center justify-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors text-xl">
              <IoMdSkipBackward />
            </button>

            <button className="bg-white hover:scale-105 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 transition-all">
              <IoMdPlay className="text-xl ml-0.5" />
            </button>

            <button className="text-gray-400 hover:text-white transition-colors text-xl">
              <IoMdSkipForward />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 min-w-[35px] text-right">
              0:00
            </span>

            <div className="relative flex-1">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="30"
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer
             "
              />
            </div>

            <span className="text-xs text-gray-400 min-w-[35px]">3:45</span>
          </div>
        </div>

        <div className="flex items-center gap-3 min-w-[200px] justify-end">
          <button className="text-gray-400 hover:text-white transition-colors text-xl">
            <IoMdVolumeHigh />
          </button>

          <div className="relative hidden md:block">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer
               "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
