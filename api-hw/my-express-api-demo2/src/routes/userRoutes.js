const express = require("express");
const logger = require ("../middleware/logger");
const userController = require("../controllers/userController");
const { validateUser } = require("../validations/userValidation");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", validateUser, userController.createUser);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;