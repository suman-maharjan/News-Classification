const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sender: { type: String, required: "Sender is require" },
  message: { type: String, required: "Message is require" },
  type: { type: String, default: "success" },
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Conversation", conversationSchema);
