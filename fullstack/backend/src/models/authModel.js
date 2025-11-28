const { connectDB, sql } = require('../config/db');

async function getUserByEmail(Email) {
    try {
        let connection = await connectDB();
        let query = await connection.request()
            .input('Email', sql.VarChar, Email)
            .query("SELECT Id, Email, Password, Role, Deleted FROM [User] WHERE Email = @Email");

        return query.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getUserByEmail }