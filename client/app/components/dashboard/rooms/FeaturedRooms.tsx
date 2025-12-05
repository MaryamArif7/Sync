"use client";
import { useState } from "react";
import { Users, Music } from "lucide-react";

interface Room {
  id: string | number;
  name: string;
  members: number;
  color: string;
}

interface FeaturedRoomsProps {
  rooms: Room[];
  syncId: string;
}

export const FeaturedRooms = ({ rooms, syncId }: FeaturedRoomsProps) => {
  const [roomInput, setRoomInput] = useState("");

  const handleJoinRoom = () => {
    if (roomInput.trim()) {
      console.log("Joining room:", roomInput);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold">Featured Rooms</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center py-8">
              No featured rooms available
            </p>
          ) : (
            rooms.map((room) => (
              <div key={room.id} className="cursor-pointer group">
                <div
                  className={`aspect-square bg-gradient-to-br ${room.color} rounded-xl mb-3 flex items-center justify-center relative overflow-hidden`}
                >
                  <Music size={40} className="text-white/30" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
                <h3 className="font-semibold text-base mb-1 truncate">
                  {room.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Users size={12} />
                  <span>{room.members} listening</span>
                </div>
              </div>
            ))
          )}
        </div>
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
            onClick={handleJoinRoom}
            className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};
