const { getEducation, getWholeUserEducation, addEducationToUser, editUserEducation, deleteUserEducation } = require("../models/educationModel");
const { validateUserExists } = require("../validations/userValidation");
const { validateUserHasEducation, validateEducationRecordExists } = require('../validations/educationValidation');

exports.getEducation = async (res) => {
    try {
        const education = await getEducation();
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: 'Education records not found', error: error.message });
    }
}

exports.getUserEducation = async (userId, res) => {
    try {
        const userExists = await validateUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const response = await getWholeUserEducation(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve this user's skills.", error: error.message })
    }
}

exports.addUserEducation = async (eduData, res) => {
    try {
        const userExists = await validateUserExists(eduData.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const response = await addEducationToUser(eduData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to add education to this user.", error: error.message })
    }
}

exports.editUserEducation = async (eduData, res) => {
    try {
        const userExists = await validateUserExists(eduData.userID);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const userEduExists = await validateEducationRecordExists(eduData.userID, eduData.eduID);
        if (!userEduExists) {
            return res.status(404).json({ message: "This user doesn't posses this education."});
        }

        const response = await editUserEducation(eduData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable this to edit user's education.", error: error.message })
    }
}

exports.deleteUserEducation = async (eduObj, res) => {
    try {
        const userExists = await validateUserExists(eduObj.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const userEduExists = await validateEducationRecordExists(eduObj.userId, eduObj.eduId);
        if (!userEduExists) {
            return res.status(404).json({ message: "This user doesn't posses this education."});
        }

        const response = await deleteUserEducation(eduObj);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to delete this user.", error: error.message })
    }
}

