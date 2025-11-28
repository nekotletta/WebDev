const { getSkills, createSkillForUser, getAllUserSkills, editUserSkill, deleteUserSkill } = require('../models/skillModel'); // Adjust based on your directory structure
// const { validateUserExists } = require('../validators/userValidation');

// here is where all requests go to 

// Get all skills from every user
exports.getSkills = async (req, res) => {
    try {
        const skills = await getSkills();
        res.status(200).json(skills); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createSkill = async (req, res) => {
    try {
        const userID = req.params.userId;
        let skillData = req.body; 
        skillData.UserId = userID;
        const result = await createSkillForUser(skillData);
        res.status(201).json(result); 
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserSkills = async (req, res) => {
    try {
        const userID = req.params.userId;
        const result = await getAllUserSkills(userID);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error retrieving user's skills: ", error);
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

exports.editUserSkill = async (req, res) => {
    try {
        const userID = req.params.userId;
        const skillID = req.params.id;
        let skillData = req.body;
        skillData.userId = userID;
        skillData.skillId = skillID;
        const result = await editUserSkill(skillData);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error editing user's skill: ", error);
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

exports.deleteUserSkill = async (req, res) => {
    try {
        const userID = req.params.userId;
        const skillID = req.params.id;
        const skillObj  = {
            'userId' : userID,
            'skillId' : skillID
        }
        const result = await deleteUserSkill(skillObj);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error editing user's skill: ", error);
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}