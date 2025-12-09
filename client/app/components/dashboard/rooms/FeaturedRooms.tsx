"use client";
import { useState } from "react";
import { Users, Music, Headphones } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/store/UserContext";

interface Room {
  id: string | number;
  roomId: string;
  listeners: number;
  color: string;
}

interface FeaturedRoomsProps {
  rooms: Room[];
  syncId: string;
}

export const FeaturedRooms = ({ rooms, syncId }: FeaturedRoomsProps) => {
  const [roomInput, setRoomInput] = useState("");
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>(rooms);
  const { roomId, setRoomId } = useUserContext();
  const router = useRouter();

  const handleJoinRoom = (roomId?: string) => {
    const room = roomId || roomInput.trim();
    if (room) {
      router.push(`Discover/rooms/${room}`);
      setRoomId(room);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold">Featured Rooms</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {featuredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]  flex items-center justify-center">
                <Headphones size={48} className="text-pink-500/50" />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-gray-200">
              No Featured Rooms Yet
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              There are no featured rooms available right now. Public rooms
              created by the other users will show here
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="break-inside-avoid mb-4 cursor-pointer group"
              >
                <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-pink-500/30 transition-all relative overflow-hidden">
                  <Music size={40} className="text-pink-500/30 mb-4" />
                  <h3 className="font-semibold text-base mb-2">
                    {room.roomId}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Users size={12} />
                    <span>{room.listeners} listening</span>
                  </div>

                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinRoom(room.roomId);
                      }}
                      className="px-6 py-2.5 rounded-full bg-black-950/50 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300 font-semibold hover:shadow-[0_0_40px_rgba(179,102,255,0.6)]"
                    >
                      Join Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter room Link or id"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
            className="bg-gray-900 border border-gray-800 rounded-full px-5 py-2.5 w-80 focus:outline-none focus:border-gray-700 transition-colors text-sm"
          />
          <button
            onClick={() => handleJoinRoom()}
            className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};
