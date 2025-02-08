import express from "express";
import {
  readChatRoom,
  readOneChatRoomInfo,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom,
  getChatRoomMembers,
} from "../controllers/chatRoomController.js";

const router = express.Router();

router.get("/", readChatRoom);
router.post("/create", createChatRoom);
router.get("/info/:_id", readOneChatRoomInfo);
router.put("/edit/:_id", updateChatRoom);
router.get("/members/:_id", getChatRoomMembers);
router.delete("/delete/:_id", deleteChatRoom);

export default router;
