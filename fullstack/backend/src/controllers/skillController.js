const skillService = require("../services/skillService");

exports.getSkills = async (req, res) => {
    const skills = await skillService.getAllSkills(res);
    return skills;
};

exports.createSkill = async (req, res) => {
    const userID = req.params.userId;
    let skillData = req.body; 
    skillData.UserId = userID;
    const result = await skillService.createSkill(skillData, res);
    return result;
};

exports.getUserSkills = async (req, res) => {
    const userID = req.params.userId;
    const result = await skillService.getAllUserSkills(userID, res);
    return result;
}

exports.editUserSkill = async (req, res) => {
    const userID = req.params.userId;
    const skillID = req.params.id;
    let skillData = req.body;
    skillData.userId = userID;
    skillData.skillId = skillID;
    const result = await skillService.editUserSkill(skillData, res);
    return result;
}

exports.deleteUserSkill = async (req, res) => {
    const userID = req.params.userId;
    const skillID = req.params.id;
    const skillObj  = {
        'userId' : userID,
        'skillId' : skillID
    }
    const result = await skillService.deleteUserSkill(skillObj, res);
    return result;
}