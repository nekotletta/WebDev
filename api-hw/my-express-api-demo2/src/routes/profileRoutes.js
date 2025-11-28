const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();
// no validation whatsoever, as this is a compilation of all records in all the table,
// which in theory shouldve been validated beforehand 
router.get('/:userId', profileController.getUserProfile);

module.exports = router;