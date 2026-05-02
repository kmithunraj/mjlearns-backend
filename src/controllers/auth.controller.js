const asyncHandler = require("../utils/asyncHandler");
const { register, login } = require("../services/auth.service");

const registerController = asyncHandler(async (req, res) => {
  const result = await register(req.body.email, req.body.password);
  res.status(201).json({
    message: "Account created",
    token: result.token,
    user: result.user,
  });
});

const loginController = asyncHandler(async (req, res) => {
  const result = await login(req.body.email, req.body.password);
  res.status(200).json({
    message: "Signed in",
    token: result.token,
    user: result.user,
  });
});

module.exports = { registerController, loginController };
