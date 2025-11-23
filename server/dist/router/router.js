"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topSongs_1 = require("../functions/topSongs");
const search_1 = require("../functions/search");
const router = express_1.default.Router();
router.get("/topSongs", topSongs_1.topSongs);
router.get("/search", search_1.search);
exports.default = router;
