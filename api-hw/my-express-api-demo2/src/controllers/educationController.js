const educationService = require("../services/educationService");

exports.getEducation = async (req, res) => {
    const education = await educationService.getEducation(res);
    return education;
};

exports.getUserEducation = async (req, res) => {
    const userID = req.params.userId;
    const result = await educationService.getUserEducation(userID, res);
    return result;
}

exports.createEducation = async (req, res) => {
    const userID = req.params.userId;
    let eduData = req.body;
    eduData.userId = userID;
    const result = await educationService.addUserEducation(eduData, res);
    return result;
}

exports.editEducation = async (req, res) => {
    const userID = req.params.userId;
    const eduID = req.params.id;
    let eduData = req.body;
    eduData.userID = userID;
    eduData.eduID = eduID;
    const result = await educationService.editUserEducation(eduData, res);
    return result;
}

exports.deleteEducation = async (req, res) => {
    const userID = req.params.userId;
    const eduID = req.params.id;
    const eduObj  = {
        'userId' : userID,
        'eduId' : eduID
    }
    const result = await educationService.deleteUserEducation(eduObj, res);
    return result;
}