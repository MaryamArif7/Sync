interface SongCardProps {
  name: string;
  artist: string;
  rank: number;
  image: string;
  url: string;
}

export const SongCard = ({ name, artist, rank, image, url }: SongCardProps) => {
  return (
    <div className="relative group">
      <div className="absolute bg-[hsl(25,95%,55%)] opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-300" />

      <div className="relative bg-[#0a0614]/80 backdrop-blur-xl border border-[#2e2044] rounded-3xl p-2 hover:border-[#ff9068]/50 transition-all hover:scale-[1.02] duration-300">
        <div className="flex gap-2 items-center">
          <span className="text-xl font-bold text-white min-w-[2rem] text-center">
            {rank}
          </span>

          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {name}
            </h3>
            <p className="text-xs text-gray-400 truncate">{artist}</p>
          </div>

          <button
            onClick={() => window.open(url, "_blank")}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full  bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]/10 hover:bg-[#ff7a4d] flex-shrink-0"
            aria-label={`Play ${name}`}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
