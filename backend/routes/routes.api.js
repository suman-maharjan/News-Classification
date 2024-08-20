const router = require("express").Router();
const authRouter = require("../modules/auth/auth.route");

router.get("/", (req, res, next) => {
  res.json({
    dataL: "",
    message: "API is working",
  });
});

router.use("/auth", authRouter);
router.use("/message", messageRouter);

router.all("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "Routes not found" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
