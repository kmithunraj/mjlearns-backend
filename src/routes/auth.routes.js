const express = require("express");
const rateLimit = require("express-rate-limit");
const validate = require("../middleware/validate.middleware");
const { sendOtpController, verifyOtpController } = require("../controllers/auth.controller");
const { sendOtpSchema, verifyOtpSchema } = require("../validators/auth.validator");

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: "Too many OTP requests. Please try again later." },
});

router.post("/send-otp", otpLimiter, validate(sendOtpSchema), sendOtpController);
router.post("/resend-otp", otpLimiter, validate(sendOtpSchema), sendOtpController);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpController);

module.exports = router;
