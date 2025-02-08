import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema({
  caller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  type: {
    type: String,
    enum: ["voice", "video"],
    required: true,
    default: "voice",
  },
  status: {
    type: String,
    enum: ["ended", "ongoing", "calling"],
    default: "calling",
  },
  startedAt: { type: Date, default: Date.now },
  duration: { type: Number, default: 0 },
  endedAt: { type: Date, default: null },
});

const CallLog = mongoose.model("CallLog", callLogSchema);
export default CallLog;
