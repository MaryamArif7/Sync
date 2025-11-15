import Spotify from "../lib/spotify";
export const getAccessToken=async()=>{
    const token=await Spotify.clientCredentialsGrant();
    console.log(token);
    return token.body.access_token;
}