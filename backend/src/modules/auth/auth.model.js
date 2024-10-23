const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  email: String,
  otp: String,

  token_expiry: { type: Date },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const authModel = model("Auth", authSchema);
module.exports = authModel;
