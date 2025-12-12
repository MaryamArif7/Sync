import { Response, Request } from "express";
import { Queue } from "../models/queueModel";
export const getQueue = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;

        const queue = await Queue.find({ roomId, status: { $ne: 'played' } })
            .sort({ position: 1 })
            .exec();

        res.status(200).json({
            success: true,
            data: queue
        });
    } catch (error: any) {
        console.error('Error fetching queue:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch queue',
            error: error.message
        });
    }
}