const router = require("express").Router();
const authRouter = require("../modules/auth/auth.route");
const newsRouter = require("../modules/news/news.route");

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.use("/auth", authRouter);
// router.use("/message", messageRouter);
router.use("/news", newsRouter);

router.all("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "failed" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
