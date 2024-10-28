import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { PORT } from "@utils/constants";
import { connectDB } from "./configs/db";

connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("Hello Socket.io");
  console.log("socket connected");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

server.listen(PORT, () => {
  console.log(`Server is listening on : http://127.0.0.1:${PORT}`);
});
