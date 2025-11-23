"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const redis_1 = __importDefault(require("../cache/redis"));
const yt_1 = require("../lib/yt");
const ytMusic_1 = __importDefault(require("../lib/ytMusic"));
const encrypt = (videoId) => {
    return Buffer.from(videoId).toString('base64url');
};
const search = async (req, res) => {
    try {
        const search = String(req.query.name || "").trim();
        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Please enter a keyword to search",
            });
        }
        const key = `search:${search}`;
        if (await redis_1.default.has(key)) {
            const data = await redis_1.default.get(key);
            return res.status(200).json({
                success: true,
                data: data,
            });
        }
        const isUrl = search.startsWith("http://") || search.startsWith("https://");
        const yt = isUrl ? await (0, yt_1.youtube)() : null;
        const [ytMusicResults, youtubeResults] = await Promise.allSettled([
            !isUrl ? ytMusic_1.default.searchSongs(search) : Promise.resolve(null),
            yt ? yt.search(search) : Promise.resolve(null),
        ]);
        const ytSongs = ytMusicResults.status === "fulfilled" ? ytMusicResults.value : null;
        const yt2Songs = youtubeResults.status === "fulfilled" ? youtubeResults.value : null;
        if (!ytSongs && !yt2Songs) {
            return res.status(404).json({
                success: false,
                message: "No results found",
            });
        }
        const normalizeImageUrl = (url) => `https://wsrv.nl/?url=${url
            .replace(/w\d+-h\d+/, "w500-h500")
            .replace("w120-h120", "w500-h500")}`;
        const songs = ytSongs?.map((s) => ({
            id: s.videoId,
            name: s.name,
            artists: {
                primary: [{ name: s.artist.name }],
            },
            video: !s.thumbnails?.[0]?.url.includes("https://lh3.googleusercontent.com"),
            image: s.thumbnails?.[s.thumbnails.length - 1]
                ? [
                    {
                        quality: "500x500",
                        url: normalizeImageUrl(s.thumbnails[s.thumbnails.length - 1].url),
                    },
                ]
                : [],
            source: "youtube",
            downloadUrl: [
                {
                    quality: "320kbps",
                    url: encrypt(s.videoId),
                },
            ],
        })) || [];
        const songs2 = yt2Songs?.results
            ?.filter((result) => result.type === "Video")
            .slice(0, 1)
            .map((s) => ({
            id: s.id,
            name: s.title.text,
            artists: {
                primary: [{ name: s.author.name }],
            },
            video: !s.thumbnails?.[0]?.url.includes("https://lh3.googleusercontent.com"),
            image: s.thumbnails?.[s.thumbnails.length - 1]
                ? [
                    {
                        quality: "500x500",
                        url: normalizeImageUrl(s.thumbnails[s.thumbnails.length - 1].url),
                    },
                ]
                : [],
            source: "youtube",
            downloadUrl: [
                {
                    quality: "320kbps",
                    url: encrypt(s.id),
                },
            ],
        })) || [];
        const payload = {
            total: songs.length + songs2.length,
            results: [...songs2, ...songs],
        };
        await redis_1.default.set(key, JSON.stringify(payload));
        return res.status(200).json({
            success: true,
            data: payload,
        });
    }
    catch (e) {
        console.error("Search error:", e);
        return res.status(500).json({
            success: false,
            message: e.message || "Internal server error",
        });
    }
};
exports.search = search;
