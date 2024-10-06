const { totp } = require("otplib");

const generateOTP = () => {
  // generate random 6 digit
  return Math.floor(100000 + Math.random() * 900000);

  // totp.options = { step: +process.env.OTP_DURATION_IN_SECS };
  // return totp.generate(process.env.OTP_SECRET);
};

const verifyOTP = (token) => {
  totp.options = { step: +process.env.OTP_DURATION_IN_SECS };
  return totp.check(token, process.env.OTP_SECRET);
};

module.exports = { generateOTP, verifyOTP };
