import dotenv from "dotenv";
import express, { json } from "express";
import userRoutes from "./routes/userRoutes.js";
import chatRoomRoutes from "./routes/chatRoomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import callLogRoutes from "./routes/callLogRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

import http from "http";
import initSocket from "./socket.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(protect);

app.use("/api/users", userRoutes);
app.use("/api/chatrooms", chatRoomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/calllogs", callLogRoutes);
app.use("/api/notifications", notificationRoutes);

export const server = http.createServer(app);
export const io = initSocket(server);

export default server;
