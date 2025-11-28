const express = require("express");
const messagesController = require("../controllers/messagesController");
const { validateMessage } = require("../validations/messageValidation");
const verifyJWT = require('../middleware/jwt');

const router = express.Router();

// get all messages sent to a user
// router.get("/", messagesController.getMessages);
router.get("/:userId", verifyJWT, messagesController.getUserMessages);
router.post('/:userId', validateMessage, messagesController.addMessage);
router.delete('/:userId/:id', verifyJWT, messagesController.deleteMessage);
module.exports = router;