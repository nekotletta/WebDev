const { request } = require('express');
const { connectDB, sql }  = require('../config/db'); 

// validate that the profile has all required fields 
// const { check, validationResult } = require("express-validator");

// exports.validateUser = [
//     check("name").notEmpty().withMessage("Name is required"),
//     check("email").isEmail().withMessage("Valid email is required"),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];


async function validateUserExists(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('Id', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [User] WHERE Id = @Id")

    return userCheckResult.recordset[0].count > 0;
}

async function validateUserHasSkill(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('UserId', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [Skill] WHERE UserId = @UserId")

    return userCheckResult.recordset[0].count > 0;
}

async function validateSkillRecordExists(userID, skillID) {
    const connection = await connectDB();
    const skillCheckResult = await connection.request()
        .input('Id', sql.Int, skillID)
        .input('UserId', sql.Int, userID)
        .query('SELECT COUNT(*) AS count FROM [Skill] WHERE Id = @Id AND UserId = @UserId')
    
    return skillCheckResult.recordset[0].count > 0;
}

async function validateUserHasEducation(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('UserId', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [Education] WHERE UserId = @UserId")

    return userCheckResult.recordset[0].count > 0;
}

// async function validateUserHasDegree(userID) {
//     const connection = await connectDB();
//     const userCheckResult = await connection.request()
//         .input('UserId', sql.Int, userID)
//         .query("SELECT COUNT(*) AS count FROM [Education] WHERE UserId = @UserId")

//     return userCheckResult.recordset[0].count > 0;
// }

async function validateUserHasExperience(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('UserId', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [Experience] WHERE UserId = @UserId")

    return userCheckResult.recordset[0].count > 0;
}

module.exports = { validateUserExists, validateUserHasSkill, validateSkillRecordExists };