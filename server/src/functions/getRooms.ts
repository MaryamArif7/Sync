// import { Request, Response } from "express";
// import { authRequest } from "../middleware/request";
// import { Room } from "../models/roomModel";

// export const getRoom = async (req: authRequest, res: Response) => {
//   try {
//  const id=req.userId;
// console.log(id);
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide user ID"
//       });
//     }

//     const room = await Room.findById(_id:id).populate("createdBy");

//     if (!room) {
//       return res.status(404).json({
//         success: false,
//         message: "Room not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Room fetched successfully",
//       data: room
//     });
//   } catch (e: any) {
//     return res.status(500).json({
//       success: false,
//       message: e.message || "An error occurred while fetching room"
//     });
//   }
// };
import { Request, Response } from "express";
import { authRequest } from "../middleware/request";
import { Room } from "../models/roomModel";

export const getRoom = async (req: authRequest, res: Response) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide user ID"
      });
    }

 
    const rooms = await Room.find({ createdBy: userId })
      .populate("createdBy", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User rooms fetched successfully",
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