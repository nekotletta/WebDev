const express = require("express");
const educationController = require("../controllers/educationController");
const { validateEducation } = require("../validations/educationValidation");
const verifyJWT = require('../middleware/jwt');

const router = express.Router();

// get all experience records
router.get("/", educationController.getEducation);
router.get('/:userId', educationController.getUserEducation);
router.post('/:userId', verifyJWT, validateEducation, educationController.createEducation);
router.put('/:userId/:id', verifyJWT, validateEducation, educationController.editEducation);
router.delete('/:userId/:id', verifyJWT, educationController.deleteEducation);
module.exports = router;