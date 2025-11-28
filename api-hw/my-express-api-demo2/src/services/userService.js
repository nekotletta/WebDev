const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../models/userModel");
const { validateUserExists } = require("../validations/userValidation");

exports.getAllUsers = async (res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Users not found', error: error.message });
    }
}

exports.getUserById = async (id, res) => {
    try {
        const userExists = await validateUserExists(id);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}

exports.createUser = async (data, res) => {
    try {
        const id = await createUser(data);
        // user didnt add a password to post req
        if(id.bad_request){
            return res.status(400).json({ message: id.message });
        }
        res.status(201).json({id: id});
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
}
exports.updateUser = async (id, data, res) => {
    try {
        const userExists = await validateUserExists(id);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }
        await updateUser(id, data);
        res.status(200).json({message: `User ${id} was successfully updated!`});
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

exports.deleteUser = async (id, res) => {
    try {
        const userExists = await validateUserExists(id);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }
        await deleteUser(id);
        res.status(200).json({message: `User ${id} was successfully removed!`});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}