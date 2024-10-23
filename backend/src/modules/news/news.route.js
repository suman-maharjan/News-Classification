const secureAPI = require("../../utils/secure");
const Controller = require("./news.controller");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/classify", secureAPI("user"), async (req, res, next) => {
  try {
    const result = await Controller.classify(req.body);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
