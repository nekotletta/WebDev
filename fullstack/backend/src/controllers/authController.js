const {loginHandler} = require("../services/authService");

exports.loginHandler = async (req, res) => {
    const result = loginHandler(req, res);
    return result;
};