const experienceService = require("../services/experienceService");


exports.getExperience = async (req, res) => {
    const users = await experienceService.getExperience(res);
    return users;
};

// user experience, get it?
exports.getUX = async (req, res) => {
    const userID = req.params.userId;
    const result = await experienceService.getUserExperience(userID, res);
    return result;
}

exports.createExperience = async (req, res) => {
    const userID = req.params.userId;
    let expData = req.body;
    expData.userId = userID;
    const result = await experienceService.addUserExperience(expData, res);
    return result;
}

exports.editExperience = async (req, res) => {
    const userID = req.params.userId;
    const expID = req.params.id;
    let expData = req.body;
    expData.userID = userID;
    expData.expID = expID;
    const result = await experienceService.editUserExperience(expData, res);
    return result;
}

exports.deleteExperience = async (req, res) => {
    const userID = req.params.userId;
    const skillID = req.params.id;
    const expObj  = {
        'userId' : userID,
        'expId' : skillID
    }
    const result = await experienceService.deleteUserExperience(expObj, res);
    return result;
}