const { connectDB, sql } = require('../config/db');

// Check that the user entered a degree id that exists in the Degree table
// cant hardcode them, as theyre not pre made like the roles
async function checkDegreeExists(req, res, next) {
    const degreeId = req.body.degreeid; 
    if(degreeId === "" || degreeId === undefined || degreeId === null || degreeId.length == 0){
        return next();
    }

    try {
        const connection = await connectDB();
        let query = await connection.request()
            .input('degreeId', sql.Int, degreeId)
            .query("SELECT * FROM [Degree] WHERE Id = @degreeId");

        if (query.recordset.length > 0) {
            next();
        } else {
            return res.status(400).json({ message: "Invalid degree ID. It doesn't exist in the Degree table." });
        }
        
    } catch (err) {
        return res.status(500).json({ message: "Server error.", error: err.message });
    }
}

module.exports = { checkDegreeExists };