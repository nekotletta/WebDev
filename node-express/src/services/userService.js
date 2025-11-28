const {getUsers} = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error fetching users', error: error.message});
    }
}

// exports.getUserById = async (id) => await User.findByPk(id);

// exports.createUser = async (userData) => User.create(userData);

// exports.updateUser = async (id, userData) => {
    // const user = await User.findByPk(id);
    // if (!user) return null;
    // return await user.update(userData);
// };

// exports.deleteUser = async (id) => {
    
// }