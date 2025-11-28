const { getExperience, getWholeUserExperience, addExperienceToUser, editUserExperience, deleteUserExperience } = require("../models/experienceModel");
const { validateUserExists } = require("../validations/userValidation");
const { validateUserHasExperience, validateExperienceRecordExists } = require('../validations/experienceValidation');

exports.getExperience = async (res) => {
    try {
        const exp = await getExperience();
        res.status(200).json(exp);
    } catch (error) {
        res.status(500).json({ message: 'Experience records not found', error: error.message });
    }
}

exports.getUserExperience = async (userId, res) => {
    try {
        const userExists = await validateUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        // does this user even have experience to showcase
        // this is not necesarily an error, just has nothing to show 
        // the request did go through correctly though

        // const userHasExperience = await validateUserHasExperience(userId);
        // if (!userHasExperience) {
        //     return res.status(404).json({ message: "This user has no experience to show."});
        // }
        const response = await getWholeUserExperience(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve this user's skills.", error: error.message })
    }
}

exports.addUserExperience = async (expData, res) => {
    try {
        const userExists = await validateUserExists(expData.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const response = await addExperienceToUser(expData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to add experience to this user.", error: error.message })
    }
}

exports.editUserExperience = async (expData, res) => {
    try {
        const userExists = await validateUserExists(expData.userID);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const userExpExists = await validateExperienceRecordExists(expData.userID, expData.expID);
        if (!userExpExists) {
            return res.status(404).json({ message: "This user doesn't posses this experience."});
        }

        const response = await editUserExperience(expData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable this to edit user's experience.", error: error.message })
    }
}

exports.deleteUserExperience = async (expObj, res) => {
    try {
        const userExists = await validateUserExists(expObj.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const userExpExists = await validateExperienceRecordExists(expObj.userId, expObj.expId);
        if (!userExpExists) {
            return res.status(404).json({ message: "This user doesn't posses this experience."});
        }

        const response = await deleteUserExperience(expObj);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to delete this user.", error: error.message })
    }
}