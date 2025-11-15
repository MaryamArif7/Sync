import { getAccessToken } from "./getAccessToken";
export const topSongs=async ()=>{
    const token=await getAccessToken();
   const playlistId= "37i9dQZEVXbMDoHDwVN2tF";
   const res=await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
   )
   const tracks=await res.json();
   return tracks;
}