import CallLog from "../models/CallLog.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const readCallLogs = async (req, res) => {
  const callLogs = await CallLog.find();
  res.status(200).json(callLogs);
};

export const readOneCallLog = async (req, res) => {
  try {
    const { _id } = req.params;
    const callLog = await CallLog.findById(_id);
    res.status(200).json(callLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const readUserCallLogs = async (req, res) => {
  try {
    const { _id } = req.params;
    const callLogs = await CallLog.find({ caller: _id });
    res.status(200).json(callLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const startCall = async (req, res) => {
  try {
    const { caller, receiver, type } = req.body;

    const callLog = new CallLog({ caller, receiver, type });
    await callLog.save();

    const user = await User.findById(caller);

    const notifications = receiver.map((user) => ({
      user: user.userId,
      type: "call",
      content: `Incoming ${type} call from ${user.name}`,
    }));

    await Notification.create(notifications);

    res.status(201).json({ callLog, notifications });
  } catch (error) {
    console.error("Error saat memulai panggilan:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateCall = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;
    const callLog = await CallLog.findOneAndUpdate(
      { _id },
      { status },
      { new: true }
    );
    res.status(200).json(callLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const endCall = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;
    const { startedAt } = await CallLog.findOne({ _id });
    if (!startedAt) {
      return res.status(404).json({ error: "CallLog not found" });
    }
    const duration = Date.now() - startedAt;
    const callLog = await CallLog.findOneAndUpdate(
      { _id },
      { status, duration },
      { new: true }
    );
    res.status(200).json(callLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
