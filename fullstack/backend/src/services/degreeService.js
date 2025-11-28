const { getDegrees } = require("../models/degreeModel");

exports.getDegrees = async (req, res) => {
    try {
        const degrees = await getDegrees();
        res.status(200).json(degrees);
    } catch (error) {
        res.status(500).json({ message: 'Degree records not found', error: error.message });
    }
}