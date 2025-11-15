import { getAccessToken } from "./getAccessToken";
export const topSongs=async ()=>{
    const token=await getAccessToken();
    console.log(token);
  
   const res=await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=10',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
   )
   const tracks=await res.json();
   console.log(tracks);
   return tracks;
}