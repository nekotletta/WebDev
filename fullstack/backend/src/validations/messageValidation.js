const { check, validationResult } = require("express-validator");

exports.validateMessage = [
    check("email").isEmail().withMessage("Valid email is required"),
    check("message").notEmpty().withMessage("A message is required"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];