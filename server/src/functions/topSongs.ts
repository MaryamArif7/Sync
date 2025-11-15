import { getAccessToken } from "./getAccessToken";
import { Request, Response } from "express";

export const topSongs = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      'https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/top-tracks',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const tracks = await response.json(); 
   
    
    return res.json(tracks);
    
  } catch (error: any) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};