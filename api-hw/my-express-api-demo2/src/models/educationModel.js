const { connectDB, sql } = require('../config/db');
const { validateUserHasEducation } = require('../validations/educationValidation');
// const { validateUserExists } = require("../validations/userValidation");

async function getEducation() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Education]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getWholeUserEducation(UserId) {

    try {
        const connection = await connectDB();

        const userHasEducation = await validateUserHasEducation(UserId);
        if (!userHasEducation) {
            return { message: "This user has no education to show."};
        }

        let query = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query("SELECT * FROM [Education] WHERE UserId = @UserId");

        return query.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
        
}

async function addEducationToUser(eduData) {
    try {
        const connection = await connectDB();

        const { userId, institution, degreeid, fieldofstudy, startdate, enddate } = eduData;

        let query = await connection.request()
            .input('UserId', sql.Int, userId)
            .input('Institution', sql.VarChar, institution)
            .input('DegreeId', sql.Int, degreeid)
            .input('FieldOfStudy', sql.VarChar, fieldofstudy)
            .input('StartDate', sql.DateTime2, startdate)
            .input('EndDate', sql.DateTime2, enddate)
            .query('INSERT INTO [Education] (UserId, Institution, DegreeId, FieldOfStudy, StartDate, EndDate) VALUES (@UserId, @Institution, @DegreeId, @FieldOfStudy, @StartDate, @EndDate)')

        return { message: `Education added for user ${userId} successfully.`}

    } catch (err) {
        throw new Error(err.message);
    }
}

async function editUserEducation(eduData) {
    try {
        const connection = await connectDB();

        const { eduID, userID, institution, degreeid, fieldofstudy, startdate, enddate } = eduData;

        let query = await connection.request()
            .input('Id', sql.Int, eduID)
            .input('UserId', sql.Int, userID)
            .input('Institution', sql.VarChar, institution)
            .input('DegreeId', sql.Int, degreeid)
            .input('FieldOfStudy', sql.VarChar, fieldofstudy)
            .input('StartDate', sql.DateTime2, startdate)
            .input('EndDate', sql.DateTime2, enddate)
            .query('UPDATE [Education] SET Institution = @Institution, DegreeId = @DegreeId, FieldOfStudy = @FieldOfStudy, StartDate = @StartDate, EndDate = @EndDate WHERE Id = @Id AND UserId = @UserId')

            return { message: `Education updated for user ${userID} successfully.`}

    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteUserEducation(eduObj) {
    try {
        const connection = await connectDB();
        const { eduId, userId } = eduObj;

        await connection.request()
            .input('UserId', sql.Int, userId)
            .input('Id', sql.Int, eduId)
            .query('DELETE FROM [Education] WHERE Id = @Id AND UserId = @UserId')

        return { message: "Education for this user deleted successfully." }

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { getEducation, getWholeUserEducation, addEducationToUser, editUserEducation, deleteUserEducation };