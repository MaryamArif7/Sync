import { Request, Response } from "express";
import { authRequest } from "../middleware/request";
import { Room } from "../models/roomModel";

export const getRoom = async (req: authRequest, res: Response) => {
  try {
 const id=req.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide room ID"
      });
    }

    const room = await Room.findById(id).populate("createdBy", "-password");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      data: room
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message || "An error occurred while fetching room"
    });
  }
};