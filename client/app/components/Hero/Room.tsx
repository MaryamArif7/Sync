import { Music2 } from "lucide-react";

export const Room=()=> {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] rounded-3xl opacity-60 blur-xl group-hover:opacity-30 transition-opacity" />
      <div className="relative bg-[#0a0614]/80 backdrop-blur-xl border border-[#2e2044] rounded-3xl p-6  transition-all hover:transform hover:scale-105 duration-300">
        <h3 className="text-lg font-bold text-[#f2f2f2] mb-4">
          Shared Listening Rooms
        </h3>
        
        <div className="flex gap-2 mb-4">
          <button 
            disabled 
            className="rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#ff7e5f]/10 to-[#feb47b]/10  border border-[#2e2044]  text-white  "
          >
            Invite Friends
          </button>
          <button 
            disabled 
            className="rounded-lg px-4 py-2 text-sm font-medium  bg-gradient-to-r from-[#ff7e5f]/10 to-[#feb47b]/10  border border-[#2e2044] text-white  "
          >
            Add Songs
          </button>
        </div>

        <div className="rounded-lg p-3 bg-gradient-to-r from-[#b366ff]/10 to-[#c94dff]/10 border border-[#2e2044]">
          <p className="text-xs text-[#888] mb-2">Now Playing</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]/10 flex items-center justify-center flex-shrink-0">
              <Music2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f2f2f2]">Spring Day</h4>
              <p className="text-xs text-[#888]">BTS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}