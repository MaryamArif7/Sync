"use client";
import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import axios from "axios";
import { SearchSongPopup } from "./SearchSongPopup";
import { Link2, ChevronDown } from "lucide-react";
import {
  IoMdPause,
  IoMdPlay,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdVolumeHigh,
} from "react-icons/io";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/store/UserContext";
import { usePlayerContext } from "@/app/store/PlayerContext";
import Player from "./Player";

export const Discover = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("queue");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingQueue, setLoadingQueue] = useState(false);

  const { roomId, queue, setQueue, setRoomId, Rooms, fetchQueue } =
    useUserContext();

  const {
    play,
    state: playerState,
    setCurrentSong,
    currentSong,
  } = usePlayerContext();
  const router = useRouter();

  const handleRoomChange = (e) => {
    const updatedRoomId = e.target.value;
    setRoomId(updatedRoomId);
    router.push(`/Discover/rooms/${updatedRoomId}`);
  };

  const handleFetchQueue = async () => {
    if (!roomId) return;
    setLoadingQueue(true);
    await fetchQueue(roomId);
    setLoadingQueue(false);
  };

  useEffect(() => {
    if (!roomId) return;

    let isMounted = true;

    const loadQueue = async () => {
      setLoadingQueue(true);
      try {
        await fetchQueue(roomId);
      } finally {
        if (isMounted) {
          setLoadingQueue(false);
        }
      }
    };

    loadQueue();

    return () => {
      isMounted = false;
    };
  }, [roomId, fetchQueue]);

  const handleSongAdded = () => {
    handleFetchQueue();
  };

  const handlePlaySong = (item) => {
    const songData = {
      id: item._id,
      name: item.title,
      source: "youtube",
      artists: {
        primary: [
          {
            id: 0,
            name: item.artist,
            role: "primary_artist",
            image: [],
            type: "artist",
            url: "",
          },
        ],
      },
      image: [
        {
          quality: "500x500",
          url: item.imageUrl,
        },
      ],
      downloadUrl: [
        {
          quality: "320kbps",
          url: item.url || item.downloadUrl,
        },
      ],
    };

    play(songData);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between gap-6 mb-2">
        <div className="bg-black flex justify-between items-center w-80 border border-white/10 rounded-2xl px-4 py-3 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300">
          <input
            className="flex-1 text-sm bg-black focus:outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Search any song..."
            onClick={() => setOpen(true)}
            readOnly
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-black rounded-xl flex items-center gap-2 transition-all border border-purple-400/20">
            <Link2 size={16} className="" />
            <span className="text-sm font-medium">Invite</span>
          </button>
          {/* <div className="relative">
            <select
              value={roomId || ""}
              onChange={handleRoomChange}
              className="text-lg font-semibold bg-black shadow-[0_0_5px_rgba(236,72,153,0.8)] rounded-xl px-4 py-2.5 pr-10 cursor-pointer appearance-none focus:outline-none focus:border-purple-400/50 hover:border-purple-400/30 transition-colors"
            >
              {Rooms?.map((room) => {
                const id = typeof room === "object" ? room.roomId : room;
                const name = typeof room === "object" ? room.roomId : room;

                return (
                  <option
                    key={id}
                    value={id}
                    className="bg-[#0a0614] text-white"
                  >
                    {name}
                  </option>
                );
              })}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div> */}
        </div>
      </div>

      {open && (
        <SearchSongPopup
          onClose={() => setOpen(false)}
          onSongAdded={handleSongAdded}
        />
      )}

      <div className=" text-white pt-4 flex gap-6 max-w-4xl">
        <Player />

        <div className="w-96 h-[490px] overflow-y-auto bg-[#0a0614]/30 rounded-3xl flex flex-col border border-white/5 shadow-[0_0_5px_rgba(236,72,153,0.3)] backdrop-blur-xl">
          <div className="flex border-b border-white/10 px-6">
            <button
              onClick={() => setActiveTab("queue")}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "queue"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              In Queue ({queue.length})
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

          <div className="flex-1  overflow-y-auto">
            {activeTab === "queue" ? (
              <div className="p-4 space-y-2">
                {loadingQueue ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
                  </div>
                ) : queue.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No songs in queue</p>
                    <p className="text-sm mt-2">Add songs to get started</p>
                  </div>
                ) : (
                  queue.map((item, index) => (
                    <div
                      key={item._id}
                      onClick={() => handlePlaySong(item)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group cursor-pointer"
                    >
                      <span className="text-gray-400 text-sm w-6">
                        {index + 1}
                      </span>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {item.artist}
                        </p>
                      </div>
                      {/* <button
                        onClick={() => handleRemoveFromQueue(item._id)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded transition-all"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button> */}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="p-6">
                <pre className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {activeTab === "lyrics"
                    ? "Lyrics will appear here..."
                    : "Listeners list..."}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
