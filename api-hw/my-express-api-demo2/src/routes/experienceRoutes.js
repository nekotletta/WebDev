const express = require("express");
const experienceController = require("../controllers/experienceController");
const { validateExperience } = require("../validations/experienceValidation");

const router = express.Router();

// get all experience records
router.get("/", experienceController.getExperience);
// get experience by user
router.get('/:userId', experienceController.getUX);
// add an experience to a user
router.post('/:userId', validateExperience, experienceController.createExperience);
// edit a user's specific experience
router.put('/:userId/:id', validateExperience, experienceController.editExperience);

router.delete('/:userId/:id', experienceController.deleteExperience);




module.exports = router;