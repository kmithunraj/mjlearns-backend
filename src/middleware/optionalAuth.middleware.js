const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Sets `req.user` when a valid Bearer token is present; otherwise `req.user` is null.
 * Does not reject the request (for public GET handlers that enrich data when signed in).
 */
module.exports = async (req, res, next) => {
  req.user = null;
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next();
  }
  try {
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.userId);
    if (user) {
      req.user = { id: user.id, email: user.email, role: user.role };
    }
  } catch {
    /* treat as guest */
  }
  return next();
};
