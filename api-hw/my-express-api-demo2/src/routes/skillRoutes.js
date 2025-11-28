const express = require("express");
const skillController = require("../controllers/skillController");
const { validateSkill } = require("../validations/skillValidation");

const router = express.Router();

router.get("/", skillController.getSkills);

// add a new skill to a specific user
router.post('/:userId', validateSkill, skillController.createSkill);


// i can get it from the url
// get every skill that a user possesses
router.get('/:userId', skillController.getUserSkills);

// edit one specific skill from a user
// example: only edit my russian skill level, dont touch the rest of them
router.put('/:userId/:id', validateSkill, skillController.editUserSkill);

// i dont think i can get it from the url, has to be through postman
// remove only one skill from a person, not all of them
router.delete('/:userId/:id', skillController.deleteUserSkill);

module.exports = router;
