const express = require("express");
const degreeController = require("../controllers/degreeController");

const router = express.Router();

// get all experience records
router.get("/", degreeController.getDegrees);
module.exports = router;