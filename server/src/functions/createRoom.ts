import { Request, Response } from "express";
import { Room } from "../models/roomModel";
import { authRequest } from "../middleware/request";
export const createRoom = async (req: authRequest, res: Response) => {
  try {
    const createdBy=req.userId;
    const { featured, roomId } = req.body;
    // console.log("auth request",authRequest);
    console.log(req);
    console.log(req.userId);
    console.log(featured);
    console.log(roomId);
    if (!roomId || !createdBy || !featured) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: roomId, createdBy, and featured"
      });
    }

   
    if (!["yes", "no"].includes(featured)) {
      return res.status(400).json({
        success: false,
        message: "Featured must be either 'yes' or 'no'"
      });
    }


    if (roomId.length > 8) {
      return res.status(400).json({
        success: false,
        message: "Room ID must not exceed 8 characters"
      });
    }

    const room = await Room.create({ roomId, featured, createdBy });

    await room.populate("createdBy");

    return res.status(201).json({
      success: true,
      message: "Room has been created successfully!",
      data: room
    });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A room with this ID already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: e.message || "Failed to create room"
    });
  }
};