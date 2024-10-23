const secureAPI = require("../../utils/secure");
const Controller = require("./conversation.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/save", secureAPI("user"), async (req, res, next) => {
  try {
    const savedConversation = await Controller.create(req, req.body);
    return res.json({ data: savedConversation, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const conversation = await Controller.getConversationByToken(req);
    if (conversation) {
      return res.json({ data: conversation, message: "success" });
    } else {
      return res.json({ data: [], message: "success" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
