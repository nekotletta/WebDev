const { check, validationResult } = require("express-validator");

exports.validateLogin = [
    check("email").notEmpty().withMessage("An email is required.").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("A password is required."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];