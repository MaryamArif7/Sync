'use client';
import { useState } from 'react';
import { Plus, Users, Music, Lock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MusicRoomsBrowser() {
  const [userRooms, setUserRooms] = useState([
    { id: 1, name: 'My Study Room', members: 3, isPrivate: true, currentSong: 'Lofi Hip Hop', color: 'from-indigo-400 to-purple-400' },
    { id: 2, name: 'Workout Mix', members: 1, isPrivate: false, currentSong: 'EDM Bangers', color: 'from-orange-400 to-red-400' },
  ]);

  const [featuredRooms] = useState([
    { id: 101, name: 'Chill Vibes', members: 8, isPrivate: false, currentSong: 'Lofi Beats', color: 'from-blue-400 to-purple-400' },
    { id: 102, name: 'Rock Legends', members: 15, isPrivate: false, currentSong: 'Bohemian Rhapsody', color: 'from-red-400 to-orange-400' },
    { id: 103, name: 'Study Session', members: 23, isPrivate: false, currentSong: 'Classical Piano', color: 'from-green-400 to-teal-400' },
    { id: 104, name: 'Jazz Night', members: 12, isPrivate: false, currentSong: 'Blue in Green', color: 'from-yellow-400 to-orange-400' },
    { id: 105, name: 'Electronic Beats', members: 18, isPrivate: false, currentSong: 'Synthwave Mix', color: 'from-pink-400 to-purple-400' },
    { id: 106, name: 'Indie Discoveries', members: 9, isPrivate: false, currentSong: 'New Indie Rock', color: 'from-teal-400 to-blue-400' },
    { id: 107, name: 'Hip Hop Classics', members: 21, isPrivate: false, currentSong: 'Old School Rap', color: 'from-purple-400 to-pink-400' },
    { id: 108, name: 'Latin Rhythms', members: 14, isPrivate: false, currentSong: 'Reggaeton Hits', color: 'from-yellow-400 to-red-400' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      const colors = [
        'from-blue-400 to-purple-400',
        'from-red-400 to-orange-400',
        'from-green-400 to-teal-400',
        'from-purple-400 to-pink-400',
        'from-yellow-400 to-orange-400'
      ];
      const newRoom = {
        id: Date.now(),
        name: newRoomName,
        members: 1,
        isPrivate: isPrivate,
        currentSong: 'No song playing',
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setUserRooms([...userRooms, newRoom]);
      setNewRoomName('');
      setIsPrivate(false);
      setShowCreateModal(false);
    }
  };

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    const scrollAmount = 400;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const RoomCard = ({ room, isCreateCard = false }) => {
    if (isCreateCard) {
      return (
        <div
          onClick={() => setShowCreateModal(true)}
          className="flex-none w-48 cursor-pointer group"
        >
          <div className="aspect-square bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center hover:border-gray-600 transition-colors mb-3">
            <Plus size={40} className="text-gray-600 group-hover:text-gray-500 transition-colors" />
          </div>
          <h3 className="font-semibold text-base mb-1 truncate">Create Room</h3>
          <p className="text-gray-400 text-sm">Start listening</p>
        </div>
      );
    }

    return (
      <div className="flex-none w-48 cursor-pointer group">
        <div className={`aspect-square bg-gradient-to-br ${room.color} rounded-xl mb-3 flex items-center justify-center relative overflow-hidden`}>
          <Music size={40} className="text-white/30" />
          {room.isPrivate && (
            <div className="absolute top-2 right-2">
              <Lock size={16} className="text-white/80" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
        <h3 className="font-semibold text-base mb-1 truncate">{room.name}</h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <Users size={12} />
          <span>{room.members} listening</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Your Rooms Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Rooms</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer('user-rooms', 'left')}
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollContainer('user-rooms', 'right')}
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div
            id="user-rooms"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <RoomCard isCreateCard={true} />
            {userRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        {/* Featured Rooms Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured Rooms</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer('featured-rooms', 'left')}
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollContainer('featured-rooms', 'right')}
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div
            id="featured-rooms"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        {/* Join Room Section */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter room Link or id"
            className="bg-gray-900 border border-gray-800 rounded-full px-5 py-2.5 w-80 focus:outline-none focus:border-gray-700 transition-colors text-sm"
          />
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm">
            Join
          </button>
        </div>

        {/* Create Room Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-5">Create Room</h2>
              
              <input
                type="text"
                placeholder="Room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-gray-700 transition-colors"
              />
              
              <label className="flex items-center gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-300">Make room private</span>
              </label>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewRoomName('');
                    setIsPrivate(false);
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-lg py-2.5 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-white text-black hover:bg-gray-200 rounded-lg py-2.5 font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}