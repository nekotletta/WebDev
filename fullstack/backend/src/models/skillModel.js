const { connectDB, sql } = require('../config/db');
const { validateUserHasSkill } = require("../validations/skillValidation");

async function getSkills() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Skill]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createSkillForUser(skillData) {
    try {
        const connection = await connectDB();
        // read the fields in the table 
        const { UserId, name, proficiency } = skillData;


        await connection.request()
            .input('UserId', sql.Int, UserId)
            .input('Name', sql.NVarChar, name)
            .input('Proficiency', sql.NVarChar, proficiency)
            .query("INSERT INTO [Skill] (UserId, Name, Proficiency) VALUES (@UserId, @Name, @Proficiency)");

        return { message: "Skill added to user succesfully."};

    } catch (err) {
        throw new Error(err.message);
    }
}

async function getAllUserSkills(UserId) {

    try {
        const connection = await connectDB();


        // does this user even have skills to showcase
        const userHasSkills = await validateUserHasSkill(UserId);
        if (!userHasSkills) {
            return { message: "This user has no skills to show."};
        }

        let query = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Skill] WHERE UserId = @UserId");

        return query.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
        
}

async function editUserSkill(skillObj) {
    try {
        const connection = await connectDB();
         // i need the user id and skill id for this
        const { name, proficiency, userId, skillId } = skillObj;


        await connection.request()
            .input('Id', sql.Int, skillId)
            .input('UserId', sql.Int, userId)
            .input('New_Name', sql.NVarChar, name)
            .input('New_Proficiency', sql.NVarChar, proficiency)
            .query('UPDATE [Skill] SET Name = @New_Name, Proficiency = @New_Proficiency WHERE Id = @Id AND UserId = @UserId')

        return { message: "Skills for this user updated succesfully."}

    } catch (err) {
        throw new Error(err.message);
    }

}

async function deleteUserSkill(userSkill) {
    try {
        const connection = await connectDB();
        const { skillId, userId } = userSkill;


        await connection.request()
            .input('UserId', sql.Int, userId)
            .input('Id', sql.Int, skillId)
            .query('DELETE FROM [Skill] WHERE Id = @Id AND UserId = @UserId')

        return { message: "Skill for this user deleted successfully." }

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { getSkills, createSkillForUser, getAllUserSkills, editUserSkill, deleteUserSkill };