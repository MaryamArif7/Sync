import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();
console.log('=== Spotify Credentials Debug ===');
console.log('Client ID:', process.env.SPOTIFY_CLIENT_ID);
console.log('Client ID length:', process.env.SPOTIFY_CLIENT_ID?.length);
console.log('Client Secret:', process.env.SPOTIFY_CLIENT_SECRET);
console.log('Client Secret length:', process.env.SPOTIFY_CLIENT_SECRET?.length);
console.log('================================');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;