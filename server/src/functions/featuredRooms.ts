
import { Request, Response } from "express";
import { Room } from "../models/roomModel";

export const featuredRooms = async (req: Request, res: Response) => {
  try {
  
    const rooms = await Room.find({ featured: "yes" })
      .populate("createdBy", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Featured rooms fetched successfully",
      count: rooms.length,
      data: rooms
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message || "An error occurred while fetching rooms"
    });
  }
};