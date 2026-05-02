const bcrypt = require("bcrypt");
const { User } = require("../models");
const { signJwt } = require("../utils/jwt");
const ApiError = require("../utils/apiError");

const SALT_ROUNDS = 10;

const toPublicUser = (user) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const issueSession = (user) => {
  const token = signJwt({ userId: user.id, role: user.role });
  return { token, user: toPublicUser(user) };
};

const register = async (email, password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const existing = await User.unscoped().findOne({ where: { email } });

  if (existing?.passwordHash) {
    throw new ApiError(409, "Email already registered");
  }

  if (existing) {
    await existing.update({ passwordHash: hash });
    return issueSession(existing);
  }

  const user = await User.create({ email, passwordHash: hash, role: "user" });
  return issueSession(user);
};

const login = async (email, password) => {
  const user = await User.unscoped().findOne({ where: { email } });
  if (!user?.passwordHash) {
    throw new ApiError(401, "Invalid email or password");
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw new ApiError(401, "Invalid email or password");
  }
  return issueSession(user);
};

module.exports = { register, login };
