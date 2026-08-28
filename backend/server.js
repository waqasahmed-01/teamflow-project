require("dotenv").config();

const app = require("./src/app");
const logger = require("./src/logger");
const connectDatabase = require("./src/config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    logger.info(`TeamFlow API running on port ${PORT}`);
  });
};

startServer();