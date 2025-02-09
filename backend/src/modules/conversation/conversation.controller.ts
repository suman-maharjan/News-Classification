import ConversationModel, { IConversation } from "./conversation.model";
import authService from "../auth/auth.controller";
import { Request, Response } from "express";
import { createConversationSchemaType } from "./conversation.schema";

class ConversationController {
  async create(
    req: Request,
    payload: createConversationSchemaType,
    res: Response
  ) {
    const { messages } = payload;

    const userId = await authService.getUserIdFromToken(req);

    // Check if the conversation already exists for the user
    const conversation = await ConversationModel.findOne({ userId });

    let savedConversation;

    if (conversation) {
      // If conversation exists, update it by pushing new messages
      savedConversation = await ConversationModel.findByIdAndUpdate(
        conversation._id,
        { $push: { messages: { $each: messages } } },
        { new: true }
      ).lean(); // Convert to plain JS Object
    } else {
      // If conversation doesn't exist, create a new one
      const newConversation = new ConversationModel({
        userId,
        messages,
      });
      savedConversation = await newConversation.save();
      savedConversation = savedConversation.toObject();
    }

    // Remove userId from the response
    delete savedConversation.userId;

    const result = savedConversation;
    return res.status(200).json({ data: result, message: "success" });
  }
  // Get a paginated conversation
  async getConversationByToken(req: Request) {
    const userId = await authService.getUserIdFromToken(req);

    // Get pagination parameters from request query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Find the conversation with the userId
    const conversation = await ConversationModel.findOne({ userId })
      .select("-userId")
      .select("messages");

    if (!conversation) {
      return { messages: [], totalMessages: 0 };
    }

    // Total number of messages in the conversation
    const totalMessages = conversation.messages.length;

    // Slice the message array based on skip and limit for pagination
    const paginatedMessages = conversation.messages
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(skip, skip + limit);

    return {
      messages: paginatedMessages,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    };
  }
}

const conversationController = new ConversationController();
export default conversationController;
