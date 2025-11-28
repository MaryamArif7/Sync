"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware/middleware");
const router_1 = __importDefault(require("./router/router"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = require("redis");
const socket_io_1 = require("socket.io");
// import { supabase } from './lib/supabase';
const mongoose_1 = __importDefault(require("mongoose"));
const redis_streams_adapter_1 = require("@socket.io/redis-streams-adapter");
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_CONNECTION_URI,
});
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ limit: "200mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(router_1.default);
const cors = {
    origin: process.env.ALLOWED_URL,
    credentials: true,
};
redisClient.connect().then(() => {
    const io = new socket_io_1.Server(server, {
        cors: cors,
        adapter: (0, redis_streams_adapter_1.createAdapter)(redisClient),
    });
    io.use(async (socket, next) => {
        try {
            socket.compress(true);
            await (0, middleware_1.midddleware)(socket, next);
        }
        catch (e) {
            console.log(e);
            next(new Error(e.message));
        }
    });
});
mongoose_1.default
    .connect(process.env.MONGODB_URL || "")
    .then(() => {
    server.listen(5000, () => {
        console.log('DB CONNECTED ⚡️ - http://localhost:5000');
    });
})
    .catch(() => {
    console.error("Failed to connect to the database");
    process.exit(1);
});
