const express = require("express");
const rateLimit = require("express-rate-limit");
const validate = require("../middleware/validate.middleware");
const { registerController, loginController } = require("../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: { message: "Too many attempts. Please try again later." },
});

router.post("/register", authLimiter, validate(registerSchema), registerController);
router.post("/login", authLimiter, validate(loginSchema), loginController);

module.exports = router;
