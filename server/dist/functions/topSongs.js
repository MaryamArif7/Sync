"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSongs = void 0;
const topSongs = async (AccessToken) => {
    const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${AccessToken}`,
        },
    });
    const tracks = await res.json();
    return tracks;
};
exports.topSongs = topSongs;
