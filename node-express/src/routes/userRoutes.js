const express = require("express");
const userController = require("../controllers/userController");
// validation goes inside the controller it seems. otherwise it causes issues
const { validateUserExists } = require("../validators/userValidation");

const router = express.Router();

// USER ENDPOINTS
// i dont need to include the word users in it, since the resource is already specified in app.js
// just to see changes lol | every single user profile
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
// i can get it from the url | specific profile
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
// i dont think i can get it from the url, has to be through postman
router.delete('/:id', userController.deleteUser);

module.exports = router;