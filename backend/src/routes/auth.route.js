const express = require("express");

const validate = require("../middlewares/validate.middleware");
const authenticate = require("../middlewares/auth.middleware");

const { registerSchema, loginSchema } = require("../validators/auth.validator");

const { register, login, getMe } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/me", authenticate, getMe);

module.exports = router;
