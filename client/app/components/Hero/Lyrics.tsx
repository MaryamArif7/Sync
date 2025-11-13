import { Music} from "lucide-react";

export const Lyrics = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-[hsl(25,95%,55%)] opacity-60  rounded-3xl  blur-xl group-hover:opacity-30 transition-opacity" />
      <div className="relative bg-[#0a0614]/80 backdrop-blur-xl border border-[#2e2044] rounded-3xl p-6 hover:border-[#ff9068]/50 transition-all hover:transform hover:scale-105 duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#f2f2f2]">
              Real-Time Lyrics
            </h3>
          </div>
        </div>

        <div className="mb-1 pb-3 ">
          <div className="flex items-center gap-2 mb-1">
            <Music className="w-4 h-4 text-[#ff9068]" />
            <h4 className="text-sm font-semibold text-[#f2f2f2]">
              BTS - Spring Day
            </h4>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg px-2 py-1 bg-gradient-to-r from-[#ff7e5f]/10 to-[#feb47b]/10 border border-[#ff9068]/20">
            <p className="text-sm text-[#f2f2f2]/90 leading-relaxed">
              I miss you
            </p>
          </div>

          <div className="rounded-lg px-2 py-1 bg-gradient-to-r from-[#ff7e5f]/5 to-[#feb47b]/5">
            <p className="text-sm text-[#888] leading-relaxed">
              Saying this out loud makes me miss you more
            </p>
          </div>

          <div className="rounded-lg px-2 py-1 bg-gradient-to-r from-[#ff7e5f]/5 to-[#feb47b]/5">
            <p className="text-sm text-[#888] leading-relaxed">
              Though I’m looking at your picture,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
