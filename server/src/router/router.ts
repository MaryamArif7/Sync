import express from "express";
import {topSongs} from "../functions/topSongs";
import { search } from "../functions/search";
const router=express.Router();
router.get("/topSongs",topSongs);
router.get("//api/search",search);
export default router;