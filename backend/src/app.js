const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.route");
const teamRoutes = require("./routes/team.route");
const teamMemberRoutes = require("./routes/teamMember.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);
app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TeamFlow API is running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/teams", teamMemberRoutes);

app.use(errorHandler);

module.exports = app;
