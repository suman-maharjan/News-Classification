const router = require("express").Router();
const Controller = require("./auth.controller");

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const result = await Controller.create(req.body);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email and password are required");

    const result = await Controller.login(email, password);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
