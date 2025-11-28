const express = require("express");
const authController = require("../controllers/authController");
const { validateLogin } = require('../validations/authValidation')

const router = express.Router();

router.post("/login", validateLogin, authController.loginHandler);

module.exports = router;