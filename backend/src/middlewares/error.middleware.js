const logger = require("../logger");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};

module.exports = errorHandler;