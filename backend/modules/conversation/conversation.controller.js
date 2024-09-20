const conversationModel = require("./conversation.model");
const { verifyToken } = require("../../utils/jwt");
const userModel = require("../user/user.model");
const authService = require("../auth/auth.controller");

class ConversationController {
  async create(req, payload) {
    const { messages } = payload;
    if (!messages) {
      throw new Error("Messages are required");
    }

    const userId = await authService.getUserIdFromToken(req);

    // Check if the conversation already exists for the user
    const conversation = await conversationModel.findOne({ userId });

    let savedConversation;
    if (conversation) {
      // If conversation exists, update it by pushing new messages
      savedConversation = await conversationModel
        .findByIdAndUpdate(
          conversation._id,
          { $push: { messages: { $each: messages } } },
          { new: true }
        )
        .lean(); // Convert to plain JS Object
    } else {
      // If conversation doesn't exist, create a new one
      const newConversation = new conversationModel({
        userId,
        messages,
      });
      savedConversation = await newConversation.save();
      savedConversation = savedConversation.toObject();
    }

    // Remove userId from the response
    delete savedConversation.userId;

    return savedConversation;
  }
  // Get a paginated conversation
  async getConversationByToken(req) {
    const userId = await authService.getUserIdFromToken(req);

    // Get pagination parameters from request query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find the conversation with the userId
    const conversation = await conversationModel
      .findOne({ userId })
      .select("-userId")
      .select("messages");

    if (!conversation) {
      return { messages: [], totalMessages: 0 };
    }

    // Total number of messages in the conversation
    const totalMessages = conversation.messages.length;

    // Slice the message array based on skip and limit for pagination
    const paginatedMessages = conversation.messages
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(skip, skip + limit);

    return {
      messages: paginatedMessages,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    };
  }
}

module.exports = new ConversationController();
