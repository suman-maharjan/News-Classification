require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is running...");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const errMsg = err ? err.message : "Something went wrong";
  res.status(err.status || 500).json({ data: "", msg: errMsg });
});
