import express from "express";
import {
  readFriends,
  readOneFriendLink,
  createFriendLink,
  blockUser,
  agreeFriendLink,
  removeFriend,
} from "../controllers/friendController.js";

const router = express.Router();

router.get("/", readFriends);
router.get("/:_id", readOneFriendLink);
router.post("/:_id", createFriendLink);
router.post("/block/:_id", blockUser);
router.put("/:_id", agreeFriendLink);
router.delete("/:_id", removeFriend);

export default router;
