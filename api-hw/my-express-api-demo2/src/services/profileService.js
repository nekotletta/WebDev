const { getUserProfile } = require("../models/profileModel");
const { validateUserExists } = require("../validations/userValidation");

exports.getUserProfile = async (userId, res) => {
    try {
        const userExists = await validateUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const response = await getUserProfile(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve this user's portfolio.", error: error.message })
    }
}