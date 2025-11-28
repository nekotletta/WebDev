const { check, validationResult } = require("express-validator");
const { connectDB, sql } = require('../config/db');

exports.validateUser = [
    check("firstName").notEmpty().withMessage("Name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateUserExists = async function(userID) {
    const connection = await connectDB();
    const userCheckResult = await connection.request()
        .input('Id', sql.Int, userID)
        .query("SELECT COUNT(*) AS count FROM [User] WHERE Id = @Id");

    return userCheckResult.recordset[0].count > 0;
};
