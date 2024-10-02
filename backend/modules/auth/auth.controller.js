const bcrypt = require("bcrypt");
const userModel = require("../user/user.model");
const authModel = require("./auth.model");
const { generateToken, verifyToken } = require("../../utils/jwt");
const { generateOTP, verifyOTP } = require("../../utils/otp");
const { mailer } = require("../../services/mail");

class AuthController {
  async getUserIdFromToken(req) {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenData = verifyToken(token);
    const { data } = tokenData;
    const { email } = data;

    const user = await userModel.findOne({ email });
    return user._id;
  }

  async create(payload) {
    const { email, password } = payload;
    const emailExist = await userModel.findOne({ email });

    if (emailExist) {
      const error = new Error("Email already exist");
      error.status = 404;
      throw error;
    }
    payload.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    const user = await userModel.create(payload);

    const otp = generateOTP();

    const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    await authModel.create({ email, otp, token_expiry: expiryDate });

    const info = await mailer(payload.email, otp);
    return "OTP sent to your email";
  }

  async verifyEmail(emailPayload, tokenPayload) {
    // Check Email Exists
    const authUser = await authModel.findOne({
      email: emailPayload,
      token_expiry: { $gt: new Date() },
    });

    if (!authUser) {
      throw new Error("Token Expired or Invalid Input");
    }

    if (authUser.otp !== tokenPayload) {
      throw new Error("Invalid OTP");
    }

    const userValid = await userModel.findOne({ email: emailPayload });

    if (userValid && userValid.isEmailVerified)
      throw new Error("Email already verified");

    await userModel.findOneAndUpdate(
      { email: emailPayload },
      { isEmailVerified: true },
      { new: true }
    );

    await authModel.deleteOne({ email: emailPayload });

    const newtokenPayload = { email: userValid.email, roles: userValid.roles };
    const token = generateToken(newtokenPayload);

    return {
      user: {
        name: userValid.name,
        email: userValid.email,
        roles: userValid.roles,
      },
      token,
    };
  }

  async regenerate(emailPayload) {
    // Check Email Exists
    const user = await authModel.findOne({ email: emailPayload });
    if (!user) throw new Error("Email not found");

    const userValid = await userModel.findOne({ email: emailPayload });

    if (userValid && userValid.isEmailVerified)
      throw new Error("Email already verified");

    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    const otp = generateOTP();
    await authModel.findOneAndUpdate(
      { email: emailPayload },
      { otp, token_expiry },
      { new: true }
    );
    await mailer(emailPayload, otp);
    return "OTP sent to your email";
  }

  async login(email, password) {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    if (!user.isActive)
      throw new Error("User is blocked. Please contact Admin");

    if (!user.isEmailVerified) {
      const error = new Error("Email not verified");
      error.status = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Email or Password is invalid");
    // JWT TOKEN GENERATION
    const payload = { email: user?.email, roles: user?.roles };
    const token = generateToken(payload);
    return {
      user: { name: user?.name, email: user?.email, roles: user?.roles },
      token,
    };
  }

  async forgotPasswordToken(email) {
    const user = await userModel.findOne({ email, isActive: true });
    if (!user) throw new Error("User not found");

    if (!user.isEmailVerified) {
      throw new Error("Email not verified");
    }
    const authUser = await authModel.findOne({ email });
    if (authUser) {
      await authModel.deleteMany({ email });
    }

    const otp = generateOTP();
    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    await authModel.create({ email, otp, token_expiry });
    mailer(email, otp);
    return "OTP sent to your email";
  }

  async forgotPassword(email, token, password) {
    // Check Email Exists
    const authUser = await authModel.findOne({
      email,
      token_expiry: { $gt: new Date() },
    });

    if (!authUser) {
      throw new Error("Token Expired or Invalid Input");
    }

    if (authUser.otp !== token) {
      throw new Error("Invalid OTP");
    }
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");
    if (!user.isActive)
      throw new Error("User is blocked. Please contact Admin");
    if (!user.isEmailVerified) throw new Error("Email not verified");

    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    await userModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    await authModel.deleteOne({ email });
    return true;
  }

  async verifyAbleEmail(email) {
    const user = await userModel.findOne({ email });
    if (!user) return false;
    if (!user.isEmailVerified) {
      return true;
    }
    return false;
  }
}

const authService = new AuthController();
module.exports = authService;
