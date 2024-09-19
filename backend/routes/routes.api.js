const router = require("express").Router();
const authRouter = require("../modules/auth/auth.route");
const newsRouter = require("../modules/news/news.route");
const conversationRouter = require("../modules/conversation/conversation.route");

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/conversation", conversationRouter);

router.all("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "Routes not found" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
