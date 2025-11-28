const messageService = require("../services/messageService");

exports.getMessages = async (req, res) => {
    const messages = await messageService.getMessages(req, res);
    return messages;
};

exports.getUserMessages = async (req, res) => {
    const userID = req.params.userId;
    const result = await messageService.getUserMessages(userID, res);
    return result;
}

exports.addMessage = async (req, res) => {
    const userID = req.params.userId;
    let msgData = req.body; 
    msgData.userId = userID;
    const result = await messageService.addMessage(msgData, res);
    return result;
};

exports.deleteMessage = async (req, res) => {
    const userID = req.params.userId;
    const msgID = req.params.id;
    const msgObj  = {
        'userId' : userID,
        'msgId' : msgID
    }
    const result = await messageService.deleteMessage(msgObj, res);
    return result;
}