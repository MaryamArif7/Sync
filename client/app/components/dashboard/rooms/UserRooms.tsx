"use client";
import { useState } from "react";
import axios from "axios";
import { Plus, Users, Music, Lock, ChevronRight } from "lucide-react";

interface Room {
  id: string | number;
  roomId: string;
  listeners: number;
  featured: boolean;
  color: string;
}

interface UserRoomsProps {
  rooms: Room[];
  syncId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const UserRooms = ({ rooms, syncId }: UserRoomsProps) => {
  const [userRooms, setUserRooms] = useState<Room[]>(rooms);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE_URL}/createroom`,
        {
          roomId: newRoomName,
          featured: isPrivate ? "no" : "yes",
        },

        {
          withCredentials: true,
          headers: {
            Cookie: `syncId=${syncId}`,
          },
        }
      );

      if (res.data?.success) {
        setUserRooms([...userRooms, res.data.data]);
        setNewRoomName("");
        setIsPrivate(false);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Failed to create room:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setNewRoomName("");
    setIsPrivate(false);
  };

  return (
    <div className="w-80  shadow-[0_0_20px_rgba(236,72,153,0.3)]  flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold">Your Rooms</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-4 p-4 rounded-lg bg-[#0a0614]/80 backdrop-blur-xl border border-[#2e2044] border-dashed  hover:border-gray-600 cursor-pointer mb-3 transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Plus size={24} className="text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold">Create Room</h3>
            <p className="text-sm text-gray-400">Start listening</p>
          </div>
        </div>
        {userRooms.map((room) => (
          <div
            key={room.id}
            className="flex items-center gap-4 p-4 rounded-lg shadow-[0_0_5px_rgba(236,72,153,0.8)] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] cursor-pointer mb-2 transition-colors group"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${room.color} flex items-center justify-center flex-shrink-0 relative`}
            >
              <Music size={20} className="text-white/50" />
              {room.featured && (
                <div className="absolute -top-1 -right-1 bg-gray-900 rounded-full p-1">
                  <Lock size={10} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{room?.roomId}</h3>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Users size={12} />
                <span>{room?.listeners}</span>
              </div>
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded transition-all"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Joining room:", room.roomId);
              }}
            >
              Join
            </button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 ">
          <div className=" rounded-2xl p-6 max-w-md w-full border border-gray-900">
            <h2 className="text-2xl font-bold mb-5">Create Room</h2>

            <input
              type="text"
              placeholder="Room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              disabled={loading}
              className="w-full bg-black border border-gray-900 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-gray-700 transition-colors disabled:opacity-50"
            />

            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                disabled={loading}
                className="w-5 h-5 rounded"
              />
              <span className="text-gray-300">Make room private</span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 bg-black border border-gray-900  rounded-lg py-2.5 font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                disabled={loading}
                className="flex-1 text-white bg-black shadow-[0_0_15px_rgba(236,72,153,0.8)] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] rounded-lg py-2.5 font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
