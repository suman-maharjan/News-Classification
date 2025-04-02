import ConversationModel from "./conversation.model";
import { createConversationSchemaType } from "./conversation.schema";

class ConversationService {
  async save(payload: createConversationSchemaType, userId: string) {
    const messages = payload.messages;
    // Check if the conversation already exists for the user
    const previousConversation = await ConversationModel.findOne({ userId });

    let savedConversation;
    if (previousConversation) {
      await ConversationModel.findOneAndUpdate(
        previousConversation._id,
        {
          $push: { messages: { $each: messages } },
        },
        { new: true }
      ).lean();
    } else {
      const newConversation = new ConversationModel({
        userId,
        messages,
      });

      newConversation.save();
      savedConversation = newConversation.toObject();
    }

    // Remove userId from the response
    delete savedConversation.userId;

    return savedConversation;
  }

  async getConversationById(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const conversation = await ConversationModel.findOne({ userId });

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

export default new ConversationService();
