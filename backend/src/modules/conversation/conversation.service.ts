import ConversationModel from "./conversation.model";
import { createConversationSchemaType } from "./conversation.schema";
import MessageModel from "./message.model";

class ConversationService {
  async save(payload: createConversationSchemaType) {
    try {
      const userId = payload.userId;
      let conversation = await ConversationModel.findOne({ userId });

      if (!conversation) {
        conversation = await ConversationModel.create({ userId });
      }

      // Add conversationId to each message
      const conversationId = conversation._id;

      const messageObject = {
        conversationId,
        input: payload.input,
        response: payload.response,
        type: payload.type,
        algorithm: payload.algorithm,
        timestamp: new Date(),
      };

      await MessageModel.create(messageObject);

      return messageObject;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getConversationById(userId: string, page: number, limit: number) {
    const conversation = await ConversationModel.findOne({ userId });

    console.log({ conversation });

    if (!conversation) {
      return { messages: [], totalMessages: 0 };
    }

    const conversationId = conversation._id;
    console.log({ conversationId });

    const skip = (Math.max(1, page) - 1) * limit;

    const [messages, totalMessages] = await Promise.all([
      MessageModel.find({ conversationId })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      MessageModel.countDocuments({ conversationId }),
    ]);

    return {
      messages,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    };
  }
}

export default new ConversationService();
