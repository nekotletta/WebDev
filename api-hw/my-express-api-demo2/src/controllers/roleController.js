const roleService = require("../services/roleService");

exports.getRoles = async (req, res) => {
    const roles = await roleService.getAllRoles(req,res);
    res.json(roles);
};