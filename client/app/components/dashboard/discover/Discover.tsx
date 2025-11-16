"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { SongCard } from "./SongCard";
export const Discover = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/topSongs");
        console.log(response);
        setTracks(response.data.tracks);
      } catch (error) {}
    };
    fetchTopSongs();
  }, []);
  return (
    <>
      <div className=" flex justify-between items-center w-72 border border-[#2e2044] rounded-3xl p-3 hover:border-[#ff9068]/50 transition-all hover:scale-[1.1] duration-300 shadow-[0_0_5px_rgba(236,72,153,0.5)]">
        <input
          className=" border-none focus:outline-none"
          type="text"
          placeholder="Search Any Song Here"
        />
        <Search className="w-5 h-5" />
      </div>
      <div className="bg-black border border-[#2e2044] backdrop-blur-xl rounded-3xl p-4 max-w-3xl mt-10 shadow-[0_0_5px_rgba(236,72,153,0.5)] ">
        <h1 className="text-2xl font-bold text-white mb-6">Listen Top Songs</h1>

        <div className="space-y-3 h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#2e2044] scrollbar-track-transparent">
          {tracks.map((track) => (
            <SongCard
              key={track.rank}
              name={track.trackName}
              artist={track.artists}
              rank={track.rank}
              image={track.cover}
              url={track.trackUri}
            />
          ))}
        </div>
      </div>
    </>
  );
};
