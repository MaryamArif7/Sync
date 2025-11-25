"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { Search ,Plus } from "lucide-react";
import axios from "axios";
import parse from "html-react-parser";
import useDebounce from "../../../hooks/useDebounce";
import { searchSongResult } from "@/app/lib/types";
import { usePlayerContext } from "../../../store/PlayerContext";

interface SearchSongPopupProps {
  onClose: () => void;
}

const formatArtistName = (artists: artists[]) => {
  return artists?.[0]?.name || "Unknown";
};

export const SearchSongPopup = ({ onClose }: SearchSongPopupProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [songs, setSongs] = useState<searchSongResult | null>(null);
  
  const { currentSong } = usePlayerContext();

  useEffect(() => {
    const handleCheatCodes = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.click();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleCheatCodes);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleCheatCodes);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const search = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      abortControllerRef.current?.abort();
      
      const value = e.target.value.trim();
      setQuery(value);
      
      if (!value) {
        setSongs(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      const response = await axios.get(
        `http://localhost:5000/search/?name=${value}`,
        { signal: controller.signal }
      );
      
      if (response.data.success) {
        setSongs(response.data as searchSongResult);
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        console.error("Error in searching, try again");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useDebounce(search);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]">
      <div ref={searchRef} className="w-full max-w-2xl mx-4">
        <div className="bg-black rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-gray-700">
            <Search size={20} className="text-gray-400" />
            <input
              autoFocus
              onChange={handleSearch}
              type="text"
              className="flex-1 bg-transparent border-none px-3 text-white outline-none"
              placeholder="Search Any Song Here"
            />
          </div>
          
          {loading && (
            <div className="flex items-center justify-center py-8 border-t border-zinc-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Searching...</p>
              </div>
            </div>
          )}

          {!loading && songs && (
            <div
              ref={containerRef}
              className="flex flex-col border-t border-zinc-500 overflow-y-auto backdrop-blur-xl bg-black/80 max-h-[50dvh] pl-2.5"
            >
              {songs.data.results?.map((song, i) => (
                <label
                  key={song.id}
                  htmlFor={song.id}
                  title={`${parse(song.name)} (${formatArtistName(song.artists?.primary)})`}
                  className={`flex gap-2 px-2.5 text-start hover:bg-zinc-800/20 p-2.5 items-center ${
                    i !== songs.data.results.length - 1 && "border-b border-white/20"
                  }`}
                >
                  <img
                    loading="lazy"
                    height={50}
                    width={50}
                    alt={song.name}
                    src={song.image[song.image.length - 1]?.url}
                    className="rounded"
                  />
                  <div className="text-sm font-medium overflow-hidden">
                    <p className="font-semibold truncate text-white">
                      {parse(song.name)}
                    </p>
                    <p className="font-medium text-gray-400 truncate">
                      {song.artists?.primary?.[0]?.name || "Unknown"}
                    </p>
                  </div>
                  <div>
                    
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};