"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSongs = void 0;
const getAccessToken_1 = require("./getAccessToken");
const topSongs = async () => {
    const token = await (0, getAccessToken_1.getAccessToken)();
    const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const tracks = await res.json();
    return tracks;
};
exports.topSongs = topSongs;
