"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotifyPlaylist = void 0;
const getAccessToken_1 = require("./getAccessToken");
const getSpotifyPlaylist = async (req, res) => {
    try {
        const id = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 100;
        const offset = (page - 1) * pageSize;
        // Get access token
        const token = await (0, getAccessToken_1.getAccessToken)();
        // Fetch playlist tracks from Spotify
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=${pageSize}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            console.error('Spotify API Error:', error);
            return res.status(response.status).json({ error });
        }
        const playlistData = await response.json();
        // Extract song names with artists
        const songsNameWithArtist = playlistData.items
            .map((item) => {
            const name = item?.track?.name;
            const artist = item?.track?.artists?.[0]?.name;
            return name && artist ? { search: `${name} ${artist}` } : null;
        })
            .filter((item) => item !== null);
        // Transform to your desired format
        const tracks = playlistData.items
            .map((item, index) => {
            if (!item?.track)
                return null;
            const track = item.track;
            return {
                id: track.id,
                name: track.name,
                artists: {
                    primary: track.artists.map((artist) => ({
                        name: artist.name,
                        id: artist.id,
                    })),
                },
                album: {
                    name: track.album.name,
                    id: track.album.id,
                },
                image: track.album.images.map((img) => ({
                    quality: `${img.width}x${img.height}`,
                    url: img.url,
                })),
                duration: Math.floor(track.duration_ms / 1000), // in seconds
                previewUrl: track.preview_url,
                spotifyUrl: track.external_urls.spotify,
                popularity: track.popularity,
                source: "spotify",
            };
        })
            .filter(Boolean);
        const payload = {
            success: true,
            pagination: {
                page,
                pageSize,
                offset,
                total: playlistData.total,
                hasNext: playlistData.next !== null,
            },
            results: tracks,
        };
        return res.json(payload);
    }
    catch (error) {
        console.error("Error fetching playlist:", error);
        return res.status(500).json({
            success: false,
            error: "Error fetching playlist"
        });
    }
};
exports.getSpotifyPlaylist = getSpotifyPlaylist;
