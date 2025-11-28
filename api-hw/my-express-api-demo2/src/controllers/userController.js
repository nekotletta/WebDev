const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
    const users = await userService.getAllUsers(res);
    return users;
};

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id, res);
    return user;
};

exports.createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body, res);
    return newUser;
};

exports.updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body, res);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    return updatedUser;
};

exports.deleteUser = async (req, res) => {
    const deletedUser = await userService.deleteUser(req.params.id, res);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    return deletedUser;
};