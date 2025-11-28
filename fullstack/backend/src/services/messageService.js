const { getMessages, getUserMessages, addMessage, deleteMessage } = require("../models/messageModel");
const { validateUserExists } = require("../validations/userValidation");

exports.getMessages = async (req, res) => {
    try {
        const messages = await getMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Message records not found', error: error.message });
    }
}

exports.getUserMessages = async (userId, res) => {
    try {
        const userExists = await validateUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const response = await getUserMessages(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve this user's messages.", error: error.message })
    }
}

exports.addMessage = async (msgData, res) => {
    try {
        console.log(msgData)
        const userExists = await validateUserExists(msgData.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist." });
        }

        const response = await addMessage(msgData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to add the message to this user.", error: error.message })
    }
}

exports.deleteMessage = async (msgObj, res) => {
    try {
        const userExists = await validateUserExists(msgObj.userId);
        if (!userExists) {
            return res.status(404).json({ message: "This user doesn't exist."});
        }


        const response = await deleteMessage(msgObj);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Unable to delete this message.", error: error.message })
    }
}