const express = require("express");
const skillController = require("../controllers/skillController");

const router = express.Router();

// SKILL ENDPOINTS
// i dont need to include the word users in it, since the resource is already specified in app.js
// just to see changes lol
router.get('/', skillController.getSkills);

// add a new skill to a specific user
router.post('/:userId', skillController.createSkill);


// i can get it from the url
// get every skill that a user possesses
router.get('/:userId', skillController.getUserSkills);

// edit one specific skill from a user
// example: only edit my russian skill level, dont touch the rest of them
router.put('/:userId/:id', skillController.editUserSkill);

// i dont think i can get it from the url, has to be through postman
// remove only one skill from a person, not all of them
router.delete('/:userId/:id', skillController.deleteUserSkill);

module.exports = router;