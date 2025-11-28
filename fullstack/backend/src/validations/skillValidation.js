const { check, validationResult } = require("express-validator");
const { connectDB, sql } = require('../config/db');

exports.validateSkill = [
    check("name").notEmpty().withMessage("A name for the skill is required"),
    // check("proficiency").notEmpty().withMessage("A skill level is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateUserHasSkill = async function(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('UserId', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [Skill] WHERE UserId = @UserId");

    return userCheckResult.recordset[0].count > 0;
};

exports.validateSkillRecordExists = async function(userID, skillID) {
    const connection = await connectDB();
    const skillCheckResult = await connection.request()
        .input('Id', sql.Int, skillID)
        .input('UserId', sql.Int, userID)
        .query('SELECT COUNT(*) AS count FROM [Skill] WHERE Id = @Id AND UserId = @UserId');
    
    return skillCheckResult.recordset[0].count > 0;
};