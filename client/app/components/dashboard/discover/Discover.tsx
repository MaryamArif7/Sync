"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { SearchSongPopup } from "../discover/SearchSongPopup";
import {
  Users,
  MessageSquare,
  Share2,
  Link2,
  Settings,
  Crown,
  Volume2,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Maryam's Room");
  const rooms = [
    "Maryam",
    "Chill Vibes Room",
    "K-Pop Lounge",
    "Study Session",
  ];

  
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between gap-6 mb-2">
        <div className="bg-black flex justify-between items-center w-80 border border-white/10 rounded-2xl px-4 py-3 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300 ">
          <input
            className="flex-1 text-sm bg-black focus:outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Search any song..."
            onClick={() => setOpen(true)}
            readOnly
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 ">
           <button className="px-4 py-2.5 bg-black  rounded-xl flex items-center gap-2  transition-all border border-purple-400/20 ">
            <Link2 size={16} className="" />
            <span className="text-sm font-medium">Invite</span>
          </button>
          <div className="relative">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="text-lg font-semibold bg-black shadow-[0_0_5px_rgba(236,72,153,0.8)]  rounded-xl px-4 py-2.5 pr-10 cursor-pointer appearance-none focus:outline-none focus:border-purple-400/50 hover:border-purple-400/30 transition-colors"
            >
              {rooms.map((room) => (
                <option
                  key={room}
                  value={room}
                  className="bg-[#0a0614] text-white"
                >
                  {room}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>

         
        </div>
      </div>
      {open && <SearchSongPopup onClose={() => setOpen(false)} />}
      <div className=" bg-black text-white pt-4  flex gap-6 max-w-4xl">
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

        <div className="w-96 bg-[#0a0614]/30 rounded-3xl flex flex-col border border-white/5 shadow-[0_0_5px_rgba(236,72,153,0.3)] backdrop-blur-xl">
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
            <button
              onClick={() => setActiveTab("Listeners")}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "Listeners"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Listeners
              {activeTab === "Listeners" && (
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
