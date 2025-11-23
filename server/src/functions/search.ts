import redisClient from "../cache/redis";
import { youtube } from "../lib/yt";
import ytmusic from "../lib/ytMusic";
import { Response } from "express";
import {Request} from "express";
 const encrypt = (videoId: string): string => {
  return Buffer.from(videoId).toString('base64url');
};
export const search = async (req:Request, res:Response) => {
  try {
    const search = String(req.query.name || "").trim();
    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Please enter a keyword to search",
      });
    }
    const key = `search:${search}`;
    if (await redisClient.has(key)) {
      const data = await redisClient.get(key);
      return res.status(200).json({
        success: true,
        data: data,
      });
    }

 
    const isUrl = search.startsWith("http://") || search.startsWith("https://");
    const yt = isUrl ? await youtube() : null;
    const [ytMusicResults, youtubeResults] = await Promise.allSettled([
      !isUrl ? ytmusic.searchSongs(search) : Promise.resolve(null),
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
    const normalizeImageUrl = (url: string): string =>
      `https://wsrv.nl/?url=${url
        .replace(/w\d+-h\d+/, "w500-h500")
        .replace("w120-h120", "w500-h500")}`;

    const songs =
      ytSongs?.map((s: any) => ({
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

    const songs2 =
      yt2Songs?.results
        ?.filter((result: any) => result.type === "Video")
        .slice(0, 1)
        .map((s: any) => ({
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

     redisClient.set(key, JSON.stringify(payload));

    return res.status(200).json({
      success: true,
      data: payload,
    });

  } catch (e: any) {
    console.error("Search error:", e);
    return res.status(500).json({
      success: false,
      message: e.message || "Internal server error",
    });
  }
};