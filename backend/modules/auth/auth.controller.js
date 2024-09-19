const bcrypt = require("bcrypt");
const userModel = require("../user/user.model");
const { generateToken } = require("../../utils/jwt");

const create = async (payload) => {
  const { email, password } = payload;
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    const error = new Error("Email already exist");
    error.status = 404;
    throw error;
  }
  payload.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  const user = await userModel.create(payload);

  const tokenPayload = { email: user.email, roles: user.roles };
  const token = generateToken(tokenPayload);
  return {
    user: { name: user.name, email: user.email, roles: user.roles },
    token,
  };
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  if (!user.isActive) throw new Error("User is blocked. Please contact Admin");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Email or Password is invalid");
  // JWT TOKEN GENERATION
  const payload = { email: user?.email, roles: user?.roles };
  const token = generateToken(payload);
  return {
    user: { name: user?.name, email: user?.email, roles: user?.roles },
    token,
  };
};

module.exports = { create, login };
