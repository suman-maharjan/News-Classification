const { Schema, model } = require("mongoose");
const { validateEmail } = require("./user.validation");

const userSchema = new Schema({
  name: { type: String, required: "Full Name is require" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: { type: String, required: "Password is require", select: false },
  roles: { type: Array, required: true, default: ["user"] },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

module.exports = model("User", userSchema);
