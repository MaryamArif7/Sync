import SpotifyWebApi from 'spotify-web-api-node';
const Spotify=new SpotifyWebApi({
    clientId:process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  
});

export default Spotify;