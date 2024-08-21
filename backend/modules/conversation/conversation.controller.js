const Conversation = require("./conversation.model");

const createConversation = async (payload) => {
  const { userId, ...data } = payload;
  const conversation = new Conversation.create({ userId, ...data });
  res.json(conversation);
};

const getConversationByUser = async (payload) => {
  const conversation = await Conversation.find({ userId: payload.userId });
  res.json(conversation);
};

const updateConversation = async (payload) => {
  const { userId, ...data } = payload;
  const conversation = await Conversation.findOneAndUpdate(
    { userId },
    { ...data },
    { new: true }
  );
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  res.json(conversation);
};

const deleteConversation = async (payload) => {
  const conversation = await Conversation.findOneAndDelete({
    userId: payload.userId,
  });
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  res.json(conversation);
};

export {
  createConversation,
  getConversationByUser,
  updateConversation,
  deleteConversation,
};
