import express from "express";
import {topSongs} from "../functions/topSongs";
const router=express.Router();
router.get("/topSongs",topSongs);
export default router;