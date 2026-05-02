const { Op } = require("sequelize");
const transporter = require("../config/mailer");
const { OTP, User } = require("../models");
const { signJwt } = require("../utils/jwt");
const { generateOtp } = require("../utils/otp");
const ApiError = require("../utils/apiError");

const OTP_TTL_MINUTES = Number(process.env.OTP_TTL_MINUTES || 10);

const sendOtp = async (email) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await OTP.create({ email, otp, expiresAt });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in ${OTP_TTL_MINUTES} minutes.`,
  });
};

const verifyOtp = async (email, otp) => {
  const otpRecord = await OTP.findOne({
    where: {
      email,
      otp,
      expiresAt: { [Op.gt]: new Date() },
    },
    order: [["createdAt", "DESC"]],
  });

  if (!otpRecord) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  await OTP.destroy({ where: { email } });

  const [user] = await User.findOrCreate({
    where: { email },
    defaults: { email, role: "user" },
  });

  const token = signJwt({ userId: user.id, role: user.role });
  return { token, user };
};

module.exports = { sendOtp, verifyOtp };
