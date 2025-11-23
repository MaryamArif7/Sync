"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upstashClient = void 0;
const redis_1 = require("@upstash/redis");
const node_cache_1 = __importDefault(require("node-cache"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.upstashClient = new redis_1.Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const redisClient = new node_cache_1.default();
exports.default = redisClient;
