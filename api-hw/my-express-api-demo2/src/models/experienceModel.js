const { connectDB, sql } = require('../config/db');
const { validateUserHasExperience } = require('../validations/experienceValidation');

async function getExperience() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Experience]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getWholeUserExperience(UserId) {

    try {
        const connection = await connectDB();

        const userHasExperience = await validateUserHasExperience(UserId);
        if (!userHasExperience) {
            return { message: "This user has no experience to show."};
        }

        let query = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Experience] WHERE UserId = @UserId");

        return query.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
        
}

async function addExperienceToUser(expData) {
    try {
        const connection = await connectDB();

        const { userId, jobtitle, company, description, startdate, enddate, isproject } = expData;

        await connection.request()
            .input('UserId', sql.Int, userId)
            .input('JobTitle', sql.VarChar, jobtitle)
            .input('Company', sql.VarChar, company)
            .input('Description', sql.VarChar, description)
            .input('StartDate', sql.DateTime2, startdate)
            .input('EndDate', sql.DateTime2, enddate)
            .input('IsProject', sql.VarChar, isproject)
            .query('INSERT INTO [Experience] (UserId, JobTitle, Company, Description, StartDate, EndDate, IsProject) VALUES (@UserId, @JobTitle, @Company, @Description, @StartDate, @EndDate, @IsProject)')

        return { message: `Experience added for user ${userId} successfully.`}

    } catch (err) {
        throw new Error(err.message);
    }
}

async function editUserExperience(expData) {
    try {
        const connection = await connectDB();

        const { userID, expID, jobtitle, company, description, startdate, enddate, isproject } = expData;

        await connection.request()
            .input('Id', sql.Int, expID)
            .input('UserId', sql.Int, userID)
            .input('JobTitle', sql.VarChar, jobtitle)
            .input('Company', sql.VarChar, company)
            .input('Description', sql.VarChar, description)
            .input('StartDate', sql.DateTime2, startdate)
            .input('EndDate', sql.DateTime2, enddate)
            .input('IsProject', sql.VarChar, isproject)
            .query('UPDATE [Experience] SET JobTitle = @JobTitle, Company = @Company, Description = @Description, StartDate = @StartDate, EndDate = @EndDate, IsProject = @IsProject WHERE Id = @Id AND UserId = @UserId')

            return { message: `Experience updated for user ${userID} successfully.`}

    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteUserExperience(userExp) {
    try {
        const connection = await connectDB();
        const { expId, userId } = userExp;

        await connection.request()
            .input('UserId', sql.Int, userId)
            .input('Id', sql.Int, expId)
            .query('DELETE FROM [Experience] WHERE Id = @Id AND UserId = @UserId')

        return { message: "Experience for this user deleted successfully." }

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { getExperience, getWholeUserExperience, addExperienceToUser, editUserExperience, deleteUserExperience };