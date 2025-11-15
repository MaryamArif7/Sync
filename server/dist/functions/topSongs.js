"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSongs = void 0;
const getAccessToken_1 = require("./getAccessToken");
const topSongs = async (req, res) => {
    try {
        const token = await (0, getAccessToken_1.getAccessToken)();
        console.log('Token:', token.substring(0, 20) + '...');
        const response = await fetch('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const tracks = await response.json();
        console.log('Tracks fetched:', tracks.tracks?.items?.length);
        return res.json(tracks);
    }
    catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.topSongs = topSongs;
