"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSongs = void 0;
const getAccessToken_1 = require("./getAccessToken");
const topSongs = async (req, res) => {
    try {
        const token = await (0, getAccessToken_1.getAccessToken)();
        const response = await fetch('https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/top-tracks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const tracks = await response.json();
        return res.json(tracks);
    }
    catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.topSongs = topSongs;
