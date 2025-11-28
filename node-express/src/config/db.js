require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: process.env.DB_ENCRYPT == 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE == 'true'
    }
}

async function connectDB() {
    try {
        let connection = await sql.connect(config);
        return connection;
    } catch (error) {
        console.log("Database connection failed: ", error);
        throw error;
    }
}

module.exports = { connectDB, sql };