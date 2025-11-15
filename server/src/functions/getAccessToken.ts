import Spotify from "../lib/spotify";
export const getAccessToken=async()=>{
    const token=Spotify.clientCredentialsGrant();
    return token;
}