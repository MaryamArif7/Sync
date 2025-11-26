import express from "express";
import {topSongs} from "../functions/topSongs";
import { search } from "../functions/search";
import { login } from "../functions/login";
const router=express.Router();
router.get("/topSongs",topSongs);
router.get("/search",search);
router.post("/api/login",login);
export default router;