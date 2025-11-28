const { connectDB, sql } = require('../config/db');

async function getDegrees() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Degree]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getDegrees }