const degreeService = require("../services/degreeService");

exports.getDegrees = async (req, res) => {
    const degrees = await degreeService.getDegrees(req, res);
    return degrees;
};