const { check, validationResult } = require("express-validator");
const { checkDatesAreValid } = require("../middleware/validateDates");
const { connectDB, sql } = require('../config/db');

exports.validateExperience = [
    check("jobtitle").notEmpty().withMessage("Your experence requires a title."),
    check("company").notEmpty().withMessage("Company name is required. If there isn't one, write N/A."),
    check("description").notEmpty().withMessage("Your experience needs a description. If for whatever reason there isn't one, write N/A."),

    // source: https://stackoverflow.com/questions/51267792/express-validator-to-validate-datetime
    check("startdate").notEmpty().withMessage("Please write a date with the YYYY-MM-DD format. If you don't have a date, you may write a placeholder one.")
        .isISO8601().toDate().withMessage("Please enter a valid date (YYYY-MM-DD)."),

    check("enddate").notEmpty().withMessage("Please write a date with the YYYY-MM-DD format. If you don't have a date, you may write a placeholder one.")
        .isISO8601().toDate().withMessage("Please enter a valid date (YYYY-MM-DD)."),

    // start date before end date
    checkDatesAreValid,

    // mssql doesnt have directly boolean fields, so it is entered as a string
    check("isproject").notEmpty().withMessage("Need to indicate whether this is a personal project (true) or not (false)")
    .isBoolean().withMessage("This field must either be 'true' or 'false'"),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateUserHasExperience = async function(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('UserId', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [Experience] WHERE UserId = @UserId");

    return userCheckResult.recordset[0].count > 0;
};

exports.validateExperienceRecordExists = async function(userID, expID) {
    const connection = await connectDB();
    const expCheckResult = await connection.request()
        .input('Id', sql.Int, expID)
        .input('UserId', sql.Int, userID)
        .query('SELECT COUNT(*) AS count FROM [Experience] WHERE Id = @Id AND UserId = @UserId');
    
    return expCheckResult.recordset[0].count > 0;
};