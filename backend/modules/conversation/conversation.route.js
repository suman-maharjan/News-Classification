const conversationModel = require("./conversation.model");
const secureAPI = require("../../utils/secure");
const { verifyToken } = require("../../utils/jwt");
const userModel = require("../user/user.model");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/save", secureAPI("user"), async (req, res, next) => {
  try {
    const { messages } = req.body;
    // Get the bearerToken from the request headers
    const bearerToken = req?.headers?.authorization;

    const token = bearerToken.split("Bearer ")[1];
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
    return res.json({ data: savedConversation, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const { messages } = req.body;
    // Get the bearerToken from the request headers
    const bearerToken = req?.headers?.authorization;

    const token = bearerToken.split("Bearer ")[1];
    const tokenData = verifyToken(token);
    const { data } = tokenData;
    const { email } = data;

    // get id using email
    const user = await userModel.findOne({ email: email });
    const userId = user._id;

    // Check the ConversationId with the userId exists or not
    const conversation = await conversationModel
      .findOne({ userId })
      .select("-userId");

    return res.json({ data: conversation, message: "success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
