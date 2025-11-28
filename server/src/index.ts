import express from 'express';
import dotenv from 'dotenv';
import corx from "cors";
import {midddleware} from "./middleware/middleware";
import { Socket } from "socket.io";
import router from "./router/router";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { createClient} from "redis";
import { Server } from "socket.io";
// import { supabase } from './lib/supabase';
import mongoose from "mongoose";
import { createAdapter } from "@socket.io/redis-streams-adapter";
dotenv.config();
const redisClient=createClient({
  url:process.env.REDIS_CONNECTION_URI,
})
const app = express();
 const server = createServer(app);
app.use(
  corx({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());
app.use(router);
const cors = {
  origin: process.env.ALLOWED_URL,
  credentials: true,
};
interface CustomSocket extends Socket {
  userInfo?: {
    id: string;
    role: "admin" | "listener" | string;
  }; 
  roomInfo?: { roomId: string; _id: string; progress: number }; 
}
redisClient.connect().then(()=>{
  const io=new Server(server,{
    cors:cors,
    adapter:createAdapter(redisClient),

  });
  io.use(async(socket:CustomSocket,next)=>{
    try{
      socket.compress(true);
      await midddleware(socket,next);
    }
    catch(e:any){
      console.log(e);
      next(new Error(e.message));
    }
  })
}
 
);
 mongoose
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