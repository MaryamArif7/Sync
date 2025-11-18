"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Player } from "../../common/Player";
import {
  IoMdPause,
  IoMdPlay,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdVolumeHigh,
} from "react-icons/io";
export const Discover = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("queue");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="">
      <div className=" flex justify-between items-center w-72 border border-[#2e2044] rounded-3xl p-3 hover:border-[#ff9068]/50 transition-all hover:scale-[1.1] duration-300 shadow-[0_0_5px_rgba(236,72,153,0.5)]">
        <input
          className=" border-none focus:outline-none text-sm"
          type="text"
          placeholder="Search Any Song Here"
        />
        <Search className="w-5 h-5" />
      </div>
      <div className=" bg-black text-white p-4 flex gap-6 max-w-4xl">
        <div className="flex-1 bg-[#0a0614]/30 rounded-3xl p-8 flex flex-col items-center justify-between relative overflow-hidden border border-white/5 shadow-[0_0_5px_rgba(236,72,153,0.3)] backdrop-blur-xl">
          <div className="w-52 h-52 bg-black rounded-3xl flex items-center justify-center mb-1 border border-white/10 relative overflow-hidden">
            <img src="./bg-1.webp" />
          </div>

          <div className="text-center mb-2">
            <h2 className="text-2xl font-semibold mb-2">Magic Shop</h2>
            <p className="text-gray-400">BTS</p>
          </div>

          <div className="w-full max-w-md mb-2">
            <div className="flex items-center justify-center gap-6 mb-4">
              <button className="text-gray-400 hover:text-white transition-colors text-2xl">
                <IoMdSkipBackward />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-black hover:scale-105 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_5px_rgba(236,72,153,0.3)] transition-all"
              >
                {isPlaying ? (
                  <IoMdPause className="text-2xl" />
                ) : (
                  <IoMdPlay className="text-2xl ml-1" />
                )}
              </button>

              <button className="text-gray-400 hover:text-white transition-colors text-2xl">
                <IoMdSkipForward />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-gray-400 min-w-[35px]">0:00</span>
              <div className="relative flex-1 h-1">
                <div className="absolute inset-0 bg-gray-700 rounded-full"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-full w-0"></div>
              </div>
              <span className="text-xs text-gray-400 min-w-[35px]">0:00</span>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button className="text-gray-400 hover:text-white transition-colors text-2xl">
                <IoMdVolumeHigh />
              </button>
              <div className="relative w-24 h-1">
                <div className="absolute inset-0 bg-gray-700 rounded-full"></div>
                <div className="absolute inset-0 bg-white rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 bg-[#0a0614]/30 rounded-3xl flex flex-col border border-white/5 shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-xl">
          <div className="flex border-b border-white/10 px-6">
            <button
              onClick={() => setActiveTab("queue")}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "queue"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              In Queue
              {activeTab === "queue" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("lyrics")}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "lyrics"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Lyrics
              {activeTab === "lyrics" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600"></div>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "queue" ? (
              <div className="p-6 space-y-3"></div>
            ) : (
              <div className="p-6">
                <pre className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans"></pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
