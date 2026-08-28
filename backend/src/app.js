const express = require("express");
const morgan = require('morgan');
const authRoutes = require("./routes/auth.route");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TeamFlow API is running",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

module.exports = app;