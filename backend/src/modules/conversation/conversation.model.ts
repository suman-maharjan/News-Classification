import mongoose, { Schema, Document, Types } from "mongoose";

export interface IConversation extends Document {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema: Schema<IConversation> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ConversationModel =
  (mongoose.models.Conversation as mongoose.Model<IConversation>) ||
  mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;
