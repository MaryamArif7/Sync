import express from "express";
import { topSongs } from "../functions/topSongs";
import { search } from "../functions/search";
import { login } from "../functions/login";
import { addToQueue } from "../functions/addToQueue";
import { getRoom } from "../functions/getRooms";
import { createRoom } from "../functions/createRoom";
import { featuredRooms } from "../functions/featuredRooms";
import { authMiddleware } from "../middleware/request";
import { getQueue } from "../functions/getQueue";

const router = express.Router();
router.get("/topSongs", topSongs);
router.get("/search", search);
router.post("/login", login);
router.get("/queue/:roomId", getQueue);
router.post("/addToQueue", addToQueue);
router.use(authMiddleware);
router.get("/roomsuser", getRoom);
router.get("/roomsfeatured", featuredRooms);
router.post("/createroom", createRoom);

export default router;