const asyncHandler = require("../utils/asyncHandler");
const { sendOtp, verifyOtp } = require("../services/auth.service");

const sendOtpController = asyncHandler(async (req, res) => {
  await sendOtp(req.body.email);
  res.status(200).json({ message: "OTP sent successfully" });
});

const verifyOtpController = asyncHandler(async (req, res) => {
  const result = await verifyOtp(req.body.email, req.body.otp);
  res.status(200).json({
    message: "Authentication successful",
    token: result.token,
    user: result.user,
  });
});

module.exports = { sendOtpController, verifyOtpController };
