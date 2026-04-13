"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { Search, Plus, Check, X } from "lucide-react";
import axios from "axios";
import parse from "html-react-parser";
import useDebounce from "../../../hooks/useDebounce";
import { searchSongResult } from "@/app/lib/types";
import { usePlayerContext } from "../../../store/PlayerContext";
import { useUserContext } from "@/app/store/UserContext";
import { toast } from "react-hot-toast";

interface SearchSongPopupProps {
  onClose: () => void;
  onSongAdded?: () => void;
}

interface Artist {
  name: string;
}

const formatArtistName = (artists: Artist[]) => {
  return artists?.[0]?.name || "Unknown";
};

export const SearchSongPopup = ({ onClose }: SearchSongPopupProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<searchSongResult | null>(null);
  const [addingToQueue, setAddingToQueue] = useState<string | null>(null);
  const [addedSongs, setAddedSongs] = useState<Set<string>>(new Set());

  const { roomId, setQueue } = useUserContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
        { signal: controller.signal },
      );

      if (response.data.success) {
        setSongs(response.data as searchSongResult);
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        console.error("Search error:", e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useDebounce(search);

  const handlerAddToQueue = async (song: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!roomId) {
      toast.error("Please select a room first");
      return;
    }

    try {
      setAddingToQueue(song.id);
      const songData = {
        songId: song.id,
        title: song.name,
        artist: formatArtistName(song.artists?.primary),
        imageUrl: song.image[song.image.length - 1]?.url,
        downloadUrl: song.downloadUrl[song.downloadUrl.length - 1]?.url,
        roomId,
      };

      const res = await axios.post("http://localhost:5000/addToQueue", {
        songData,
      });

      if (res.status === 200) {
        setAddedSongs((prev) => new Set([...prev, song.id]));
        if (setQueue) {
          setQueue((prev) => [...prev, res.data.data]);
        }
        toast.success("Added to queue");
      }
    } catch (e) {
      console.error("Add to queue error:", e);
      toast.error("Failed to add song to queue");
    } finally {
      setAddingToQueue(null);
    }
  };

  const isEmpty = !loading && query && !songs?.data?.results?.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-black/50">
      <div ref={searchRef} className="w-full max-w-xl mx-4">
        <div className="bg-black rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search size={18} className="text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              autoFocus
              onChange={handleSearch}
              type="text"
              placeholder="Search any song…"
              className="flex-1 bg-transparent text-white text-sm placeholder:text-zinc-500 outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setSongs(null);
                  setQuery("");
                  if (inputRef.current) inputRef.current.value = "";
                  inputRef.current?.focus();
                }}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-500 text-xs font-mono">
              Esc
            </kbd>
          </div>

          {loading && (
            <div className="flex items-center gap-3 px-4 py-4 border-t border-white/10">
              <div className="w-4 h-4 rounded-full border-2 border-zinc-600 border-t-zinc-300 animate-spin" />
              <span className="text-sm text-zinc-400">Searching…</span>
            </div>
          )}

          {isEmpty && (
            <div className="flex flex-col items-center py-10 border-t border-white/10 text-zinc-500">
              <Search size={28} className="mb-2 opacity-40" />
              <p className="text-sm">No results for "{query}"</p>
            </div>
          )}

          {!loading && songs?.data?.results?.length > 0 && (
            <div
              ref={containerRef}
              className="border-t border-white/10 overflow-y-auto max-h-[55dvh]"
            >
              {songs.data.results.map((song, i) => {
                const isAdding = addingToQueue === song.id;
                const isAdded = addedSongs.has(song.id);
                const isLast = i === songs.data.results.length - 1;

                return (
                  <div
                    key={song.id}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                      !isLast ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={song.image[song.image.length - 1]?.url}
                      alt={song.name}
                      width={44}
                      height={44}
                      className="rounded-lg shrink-0 object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate leading-tight">
                        {parse(song.name)}
                      </p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {song.artists?.primary?.[0]?.name || "Unknown"}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handlerAddToQueue(song, e)}
                      disabled={isAdding || isAdded}
                      className={`
                        inline-flex items-center gap-1.5 px-3.5 py-1.5
                        rounded-full text-xs font-medium shrink-0
                        transition-all duration-150
                        ${
                          isAdded
                            ? "bg-[#0F6E56] text-[#E1F5EE] cursor-not-allowed"
                            : isAdding
                              ? "bg-[#3C3489] text-[#AFA9EC] cursor-wait"
                              : "bg-[#534AB7] text-[#EEEDFE] hover:bg-[#3C3489] active:scale-95"
                        }
                      `}
                    >
                      {isAdding ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-[#AFA9EC] border-t-transparent animate-spin" />
                          Adding…
                        </>
                      ) : isAdded ? (
                        <>
                          <Check size={13} />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus size={13} />
                          Add to queue
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && (
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06]">
              <span className="text-xs text-zinc-600">
                {songs?.data?.results?.length
                  ? `${songs.data.results.length} results`
                  : "Type to search"}
              </span>
              <span className="text-xs text-zinc-600">
                {addedSongs.size > 0 && `${addedSongs.size} added`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
