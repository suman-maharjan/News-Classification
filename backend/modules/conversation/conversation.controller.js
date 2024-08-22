const conversationModel = require("./conversation.model");
const { verifyToken } = require("../../utils/jwt");
const userModel = require("../user/user.model");

const create = async (req, payload) => {
  const { messages } = payload;
  const bearerToken = req?.headers?.authorization;

  const token = await bearerToken.split("Bearer ")[1];
  const tokenData = verifyToken(token);
  const { data } = tokenData;
  const { email } = data;

  // get id using email
  const user = await userModel.findOne({ email: email });
  const userId = user._id;

  // Check the ConversationId with the userId exists or not
  const conversation = await conversationModel.findOne({ userId });

  if (!messages) {
    throw new Error("Messages are required");
  }

  let savedConversation;
  if (conversation) {
    savedConversation = await conversationModel
      .findByIdAndUpdate(
        conversation._id,
        { $push: { messages: { $each: messages } } },
        { new: true }
      )
      .lean(); // Convert to plain JS Object
  } else {
    // If Conversation Id doesnot exist, create the conversation
    const newConversation = new conversationModel({
      userId: userId,
      messages: messages,
    });
    savedConversation = await newConversation.save();
    savedConversation = savedConversation.toObject();
  }
  delete savedConversation.userId;

  return savedConversation;
};

const getConversation = async (req) => {
  const bearerToken = req?.headers?.authorization;

  const token = bearerToken.split("Bearer ")[1];
  const tokenData = verifyToken(token);
  const { data } = tokenData;
  const { email } = data;

  // get id using email
  const user = await userModel.findOne({ email: email });
  const userId = user._id;

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
    return { messages: [], totalMessage: 0 };
  }

  // Total number of messages in the conversation
  const totalMessages = conversation.messages.length;

  // Slice the message array based on skip and limit for pagination
  const paginatedMessage = conversation.messages
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(skip, skip + limit);

  return {
    messages: paginatedMessage,
    totalMessages,
    totalPages: Math.ceil(totalMessages / limit),
    currentPage: page,
  };
};

module.exports = { create, getConversation };
