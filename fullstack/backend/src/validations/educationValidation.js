const { check, validationResult } = require("express-validator");
const { checkDegreeExists } = require("../middleware/validateDegree");
const { checkDatesAreValid } = require("../middleware/validateDates");
const { connectDB, sql } = require('../config/db');

exports.validateEducation = [
    check("institution").notEmpty().withMessage("Your education requires an institution."),

    
    // check("degreeid").isInt().withMessage("This field is an ID (number)."),

    // check that the degree id inputed by the user actually exists in the table
    checkDegreeExists,

    // check("fieldofstudy").notEmpty().withMessage("Your education must be in a specific field. If there is no field, write N/A."),

    // source: https://stackoverflow.com/questions/51267792/express-validator-to-validate-datetime
    // check("startdate").isISO8601().toDate().withMessage("Please enter a valid date (YYYY-MM-DD)."),

    // check("enddate").isISO8601().toDate().withMessage("Please enter a valid date (YYYY-MM-DD)."),

    // start date before end date
    checkDatesAreValid,

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateUserHasEducation = async function(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('UserId', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [Education] WHERE UserId = @UserId");

    return userCheckResult.recordset[0].count > 0;
};

exports.validateEducationRecordExists = async function(userID, eduID) {
    const connection = await connectDB();
    const eduCheckResult = await connection.request()
        .input('Id', sql.Int, eduID)
        .input('UserId', sql.Int, userID)
        .query('SELECT COUNT(*) AS count FROM [Education] WHERE Id = @Id AND UserId = @UserId');
    
    return eduCheckResult.recordset[0].count > 0;
};