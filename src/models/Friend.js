import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  userlink: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "accepted", "blocked"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Friend = mongoose.model("Friend", friendSchema);
export default Friend;
