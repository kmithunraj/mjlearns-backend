require("dotenv").config();
const app = require("./app");
const logger = require("./config/logger");
const { sequelize } = require("./models");

const PORT = Number(process.env.PORT || 4000);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected");
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
