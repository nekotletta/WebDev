const { getSkills, createSkillForUser,  getAllUserSkills, editUserSkill, deleteUserSkill } = require("../models/skillModel");
const { validateUserExists } = require("../validations/userValidation");
const { validateUserHasSkill, validateSkillRecordExists } = require("../validations/skillValidation");

exports.getAllSkills = async (res) => {
    try {
        const skill = await getSkills();
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Skills not found', error: error.message });
    }
}

exports.createSkill = async (skillData, res) => {
    try {
        const userExists = await validateUserExists(skillData.UserId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist."});
        }

        const response = await createSkillForUser(skillData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to create skill for this user.", error: error.message })
    }
}

exports.getAllUserSkills = async (userId, res) => {
    try {
        const userExists = await validateUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist."});
        }

        // not an error, request does go through correctly 
        //  // does this user even have skills to showcase
        // const userHasSkills = await validateUserHasSkill(userId);
        // if (!userHasSkills) {
        //     return res.status(404).json({ message: "This user has no skills to show."});
        // }

        const response = await getAllUserSkills(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve this user's skills.", error: error.message })
    }
}

exports.editUserSkill = async (skillData, res) => {
    try {
        const userExists = await validateUserExists(skillData.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist."});
        }

        const userSkillExists = await validateSkillRecordExists(skillData.userId, skillData.skillId);
        if (!userSkillExists) {
            return res.status(404).json({ message: "This user doesn't posses this skill."});
        }

        const response = await editUserSkill(skillData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to update this user's skill.", error: error.message })
    }
}

exports.deleteUserSkill = async (skillObj, res) => {
    try {
        const userExists = await validateUserExists(skillObj.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist."});
        }

        const userSkillExists = await validateSkillRecordExists(skillObj.userId, skillObj.skillId);
        if (!userSkillExists) {
            return res.status(404).json({ message: "This user doesn't posses this skill."});
        }

        const response = await deleteUserSkill(skillObj);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to delete this user.", error: error.message })
    }
}