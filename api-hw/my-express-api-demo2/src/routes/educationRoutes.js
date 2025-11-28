const express = require("express");
const educationController = require("../controllers/educationController");
const { validateEducation } = require("../validations/educationValidation");

const router = express.Router();

// get all experience records
router.get("/", educationController.getEducation);
router.get('/:userId', educationController.getUserEducation);
router.post('/:userId', validateEducation, educationController.createEducation);
router.put('/:userId/:id', validateEducation, educationController.editEducation);
router.delete('/:userId/:id', educationController.deleteEducation);
module.exports = router;