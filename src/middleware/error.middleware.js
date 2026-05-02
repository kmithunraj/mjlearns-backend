const logger = require("../config/logger");

const notFoundHandler = (req, res) => res.status(404).json({ message: "Route not found" });

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  if (res.headersSent) return next(err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};

module.exports = { notFoundHandler, errorHandler };
