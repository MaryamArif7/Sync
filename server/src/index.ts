import express from 'express';
import dotenv from 'dotenv';
import corx from "cors";
import router from "./router/router";
import { createServer } from "http";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
// const server = createServer(app);
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
app.listen(3000, () => console.log("Server running on port 3000"));