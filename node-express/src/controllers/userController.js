const { getUsers, createUser, deleteUser, updateUser, getUserById } = require('../models/userModel'); // Adjust based on your directory structure
const userService = require('../services/userService');
// const { validateUserExists } = require('../validators/userValidation');

// here is where all requests go to 

// DE AQUI TENGO QUE MOVER TODAS A SERVICES, NO DIRECTAMENTE A MODELS

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await getUsers(); 
        res.status(200).json(users); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// create a new user
exports.createUser = async (req, res) => {
    try {
        const userData = req.body; // get all fields from the req ; ie email name pw etc
        const result = await createUser(userData);
        res.status(201).json(result); 
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// delete a specific user by id
exports.deleteUser = async (req, res) => {
    try {
        // retrieves { Id : num } format object
        const userID = req.params.id;
        const result = await deleteUser(userID);
        res.status(201).json(result);
    } catch (error) {
        console.log("Error deleting user: ", error);
        res.status(500).json({message: "Server error", error: error.message });
    }
};

// udpate a user's info by id 
// all fields must be sent for now. even if the field is not being updated, the og info should be sent
// idk how to deal with missing / empty fields
exports.updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        let userInfo = req.body;
        userInfo.UserId = userID;
        const result = await updateUser(userInfo);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// get a user object based on its id. returns all fields
exports.getUserById = async (req, res) => {
    try {
        // use params to retrieve parameters from the url (since it's a get)
        const userID = req.params.id;
        const result = await getUserById(userID);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};