import { getAccessToken } from "./getAccessToken";
import { Request, Response } from "express";

export const topSongs = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      'https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const tracks = await response.json(); 
    console.log('Tracks fetched:', tracks.tracks?.items?.length);
    
    return res.json(tracks);
    
  } catch (error: any) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};