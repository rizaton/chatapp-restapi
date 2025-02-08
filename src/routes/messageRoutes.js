import express from "express";
import {
  readMessage,
  readChatRoomMessages,
  readUserMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", readMessage);
router.get("/user/:_id", readUserMessages);
router.get("/chatroom/:_id", readChatRoomMessages);
router.post("/:chatRoom", createMessage);
router.put("/edit/:_id", updateMessage);
router.delete("/delete/:_id", deleteMessage);

export default router;
