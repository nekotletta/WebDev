const profileService = require("../services/profileService");

exports.getUserProfile = async (req, res) => {
    const userID = req.params.userId;
    const result = await profileService.getUserProfile(userID, res);
    return result;
}