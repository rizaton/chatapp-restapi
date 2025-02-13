import { Server } from "socket.io";
import socketAuthMiddleware from "./middlewares/socketMiddleware.js";
import {
  connectedUser,
  disconnectedUser,
} from "./controllers/userController.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*/*",
      methods: ["GET", "POST"],
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.id}`);

    await connectedUser(socket.user._id);
    socket.emit("statusAck", { status: "online" });
    console.log(`User ${socket.user._id} is online`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);

      socket.emit("joinRoomAck", { roomId, status: "joined" });

      const chatMessages = [];
      socket.emit("getChatMessages", chatMessages);
    });

    socket.on("sendMessage", (messageData) => {
      console.log("New message: ", messageData);

      socket.emit("messageAck", { status: "sent", message: messageData });

      io.to(messageData.chatRoom).emit("receiveMessage", messageData);
    });

    socket.on("addFriend", (friendId) => {
      console.log(`User ${socket.id} sent friend request to ${friendId}`);

      socket.emit("friendAck", { status: "request_sent", friendId });

      io.to(friendId).emit("receiveFriendRequest", { from: socket.id });
    });

    socket.on("blockFriend", (friendId) => {
      console.log(`User ${socket.id} blocked user ${friendId}`);

      socket.emit("friendAck", { status: "blocked", friendId });

      io.to(friendId).emit("blockedNotification", { by: socket.id });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      disconnectedUser(socket.user._id);

      socket.broadcast.emit("statusAck", {
        userId: socket.id,
        status: "offline",
      });
    });
  });

  return io;
};

export default initSocket;
