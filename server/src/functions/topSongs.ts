export const topSongs=async (AccessToken:String)=>{
   const playlistId= "37i9dQZEVXbMDoHDwVN2tF";
   const res=await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    }
   )
   const tracks=await res.json();
   return tracks;
}