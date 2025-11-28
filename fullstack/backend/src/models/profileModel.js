const { connectDB, sql } = require('../config/db');

async function getUserProfile(UserId) {

    try {
        const connection = await connectDB();


        let query_user = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT Email, FirstName, LastName, Role FROM [User] WHERE Id = @UserId"); 

        let query_skill = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Skill] WHERE UserId = @UserId");

        let query_exp = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Experience] WHERE UserId = @UserId");

        let query_edu = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Education] WHERE UserId = @UserId");

        let json_obj = {
            "user_info":query_user.recordsets,
            "user_skills":query_skill.recordsets,
            "user_exp":query_exp.recordsets,
            "user_edu":query_edu.recordsets
        }
        return json_obj;
    } catch (err) {
        throw new Error(err.message);
    }
        
}

module.exports = { getUserProfile };