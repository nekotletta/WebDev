const { connectDB, sql } = require('../config/db');

async function getMessages() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Contact]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getUserMessages(UserId) {

    try {
        const connection = await connectDB();
        let query = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Contact] WHERE UserId = @UserId");

        return query.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
        
}

async function addMessage(msgData) {
    try {
        const connection = await connectDB();
        // read the fields in the table 
        const { userId, email, message } = msgData;


        await connection.request()
            .input('UserId', sql.Int, userId)
            .input('Email', sql.NVarChar, email)
            .input('Message', sql.NVarChar, message)
            .input('SentDate', sql.DateTime2, new Date())
            .query("INSERT INTO [Contact] (UserId, Email, Message, SentDate) VALUES (@UserId, @Email, @Message, @SentDate)");

        return { message: "Message added to user succesfully."};

    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteMessage(userMsg) {
    try {
        const connection = await connectDB();
        const { msgId, userId } = userMsg;


        await connection.request()
            .input('UserId', sql.Int, userId)
            .input('Id', sql.Int, msgId)
            .query('DELETE FROM [Contact] WHERE Id = @Id AND UserId = @UserId')

        return { message: "Contact message deleted successfully." }

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { getMessages, getUserMessages, addMessage, deleteMessage }