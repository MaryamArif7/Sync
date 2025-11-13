import { Music2} from "lucide-react";

export const Playlists = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0  bg-[hsl(25,95%,55%)] opacity-60  rounded-3xl blur-xl group-hover:opacity-30 transition-opacity" />
      <div className="relative bg-[#0a0614]/80 backdrop-blur-xl border border-[#2e2044] rounded-3xl p-6  transition-all hover:transform hover:scale-105 duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#f2f2f2] mb-4">
              AI-Generated Playlists
            </h3>

            <div className="flex gap-2 mb-6">
              <input
              disabled={true}
                type="text"
                placeholder="e.g., BTS work playlist"
                className="flex-1 bg-[#1a1024] border border-[#2e2044] rounded-lg px-4 py-2.5 text-[#f2f2f2] placeholder-[#666] focus:outline-none focus:border-[#b366ff] transition-colors text-sm"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                Generate
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 items-center p-3 bg-[#1a1024]/50 border border-[#2e2044] rounded-lg hover:border-[#b366ff]/30 transition-colors cursor-pointer group/item">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]/10 flex items-center justify-center flex-shrink-0">
                  <Music2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#f2f2f2]  ">
                    BTS Work Playlist
                  </h4>
                  <p className="text-xs text-[#888] mt-0.5">
                    Playing this while studying
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-3 bg-[#1a1024]/50 border border-[#2e2044] rounded-lg hover:border-[#b366ff]/30 transition-colors cursor-pointer group/item">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]/10 flex items-center justify-center flex-shrink-0">
                  <Music2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#f2f2f2]  transition-colors">
                    Chill BTS songs
                  </h4>
                  <p className="text-xs text-[#888] mt-0.5">
                    Relaxing background music
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
