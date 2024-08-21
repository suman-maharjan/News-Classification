const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { generateToken, verifyToken };
