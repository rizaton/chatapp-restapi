import express from "express";
import {
  readCallLogs,
  readOneCallLog,
  readUserCallLogs,
  startCall,
  updateCall,
  endCall,
} from "../controllers/callLogController.js";

const router = express.Router();

router.get("/", readCallLogs);
router.get("/:_id", readOneCallLog);
router.get("/user/:_id", readUserCallLogs);
router.post("/call", startCall);
router.put("/call/:_id", updateCall);
router.put("/end/:_id", endCall);

export default router;
