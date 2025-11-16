"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSongs = void 0;
const topSongs = async (req, res) => {
    try {
        const response = await fetch('https://charts-spotify-com-service.spotify.com/public/v0/charts', {
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Charts API error: ${response.status}`);
        }
        const data = await response.json();
        const chartEntries = data.chartEntryViewResponses?.[0]?.entries || [];
        const tracks = chartEntries.map((entry) => ({
            rank: entry.chartEntryData?.currentRank,
            trackName: entry.trackMetadata?.trackName,
            artists: entry.trackMetadata?.artists?.map((artist) => artist.name).join(', '),
            trackUri: entry.trackMetadata?.trackUri,
            cover: entry.trackMetadata?.displayImageUri,
        }));
        return res.json({
            success: true,
            chartName: data.chartEntryViewResponses?.[0]?.displayChart?.chartMetadata?.alias || 'Global Top Songs',
            date: data.chartEntryViewResponses?.[0]?.displayChart?.chartMetadata?.currentDate,
            totalTracks: tracks.length,
            tracks: tracks,
        });
    }
    catch (error) {
        console.error('Error fetching charts:', error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
exports.topSongs = topSongs;
