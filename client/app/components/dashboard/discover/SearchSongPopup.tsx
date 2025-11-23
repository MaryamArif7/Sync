"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import axios from "axios";
import parse from "html-react-parser";
import useDebounce from "../../../hooks/useDebounce";
import { searchResults, searchSongResult } from "@/app/lib/types";
import { usePlayerContext } from "../../../store/PlayerContext";
interface SearchSongPopupProps {
  onClose: () => void;
}
const formatArtistName = (artists: artists[]) => {
  return artists
    ?.map((data, index) => {
      if (index === artists.length - 1) {
        return `${data.name}`;
      }
      return `${data.name}, ${data.name}`;
    })
    .join("")
    .split(",")[0];
};
export const SearchSongPopup = ({ onClose }: SearchSongPopupProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const containerRef=useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [songs, setSongs] = useState<searchSongResult | null>(null);
  const { currentSong } = usePlayerContext();
  const abortControllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    const handleCheatCodes = (event: KeyboardEvent) => {
      if (
        (event.metaKey && event.key === "k") ||
        (event.ctrlKey && event.key === "k")
      ) {
        event.preventDefault();
        searchRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleCheatCodes);

    return () => {
      document.removeEventListener("keydown", handleCheatCodes);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const search = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const value = e.target.value.trim();
      setQuery(value);
      if (value.length <= 0) {
        setSongs(null);
        return;
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const response = await axios.get(
        `http://localhost:5000/search/?name=${value}`,
        { signal: controller.signal }
      );
      if (response.data.success) {
        setSongs((response.data as searchSongResult) || []);
        console.log(response.data);
      }
    } catch (e) {
      console.error("Error in Searching ,try agarin");
    } finally {
      setLoading(false);
    }
  }, []);
  const handleSearch=useDebounce(search);
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]">
      <div ref={searchRef} className="w-full max-w-2xl mx-4">
        <div className="bg-black rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-gray-700 ">
            <Search size={20} className="text-gray-400" />
            <input
              autoFocus
              onChange={handleSearch}
              type="text"
              className="flex-1 bg-transparent border-none px-3 text-[#222F3F]"
              placeholder="Serach Any Song Here"
            />
          </div>
          <div
            ref={containerRef}
            className={`flex border-zinc-500 ${
              songs && "border-t"
            }  flex-col overflow-hidden backdrop-blur-xl bg-black/80 max-h-[50dvh] pl-2.5 overflow-y-scroll`}
          >
            {songs?.data?.results?.map((song, i) => (
              <label
                key={i}
                htmlFor={song?.id}
                title=
                {`${parse(song?.name)} (${formatArtistName(
                  song?.artists?.primary || "Unknown"
                )})`}
                className={`flex gap-2 px-2.5 text-start hover:bg-zinc-800/20 ${i!=songs.data.results.length-1 && "border-b"} border-white/20 p-2.5 items-center`}
                >

                  <img 
                  loading="lazy"
                   height={50}
                    width={50}
                  alt={song?.name}
                  src={song?.image[song?.image?.length-1]?.url}
                  />
                  <div className="text-sm font-medium ">
                    <p className="font-semibold ">
                    {parse(song?.name)}
                    </p>
                    <p className="font-medium  text-white">
                      {song.artists?.primary?.[0].name}
                    </p>

                  </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
