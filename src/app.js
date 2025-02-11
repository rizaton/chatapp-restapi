import express, { json } from "express";
import userRoutes from "./routes/userRoutes.js";
import chatRoomRoutes from "./routes/chatRoomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import callLogRoutes from "./routes/callLogRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/api/users", protect, userRoutes);
app.use("/api/chatrooms", protect, chatRoomRoutes);
app.use("/api/messages", protect, messageRoutes);
app.use("/api/calllogs", protect, callLogRoutes);
app.use("/api/notifications", protect, notificationRoutes);

export default app;
