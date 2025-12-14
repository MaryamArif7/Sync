import { authRequest } from "../middleware/request";
import { Response } from "express";
import { Queue } from "../models/queueModel";
export const addToQueue = async (req: authRequest, res: Response) => {
    try {
        // const userId = req.userId;
        // if (!userId) {
        //     res.status(401).json({
        //         success: false,
        //         message: "User is not authorized,please login again"
        //     })
        // }
     const {songId,title, artist, imageUrl,downloadUrl, roomId } = req.body.songData;
     console.log(req.body.songData);
        if (!songId || !title || !artist || !imageUrl || !downloadUrl || !roomId) {
            return res.status(400).json({
                success: false,
                message: "Song Id ,title ,roomId and UserId is required"
            })
        }
        const songExistsInQueue = await Queue.findOne({ songId, roomId });
        if (songExistsInQueue) {
            return res.status(400).json({
                success: false,
                message: "Song already exists in the Queue",
            });
        }
        const lastSong = await Queue.findOne({ roomId }).sort({ position: -1 }).limit(1);
        const newPosition = lastSong ? lastSong.position + 1 : 0;
        const queueItem = new Queue({
            songId, title, artist, imageUrl, downloadUrl, roomId, position: newPosition, // addedBy: userId,

        })
        await queueItem.save();
        res.status(200).json({
            success: true,
            message: 'Song added to queue successfully',
            data: queueItem
        })
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message:error.message
        });
    }
}