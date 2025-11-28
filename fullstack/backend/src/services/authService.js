require('dotenv').config();
const { getUserByEmail } = require("../models/authModel");
const jwt = require('jsonwebtoken');
const { checkCorrectPassword  } = require("../middleware/validatePassword");

//Login model referenced here
exports.loginHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if(!user){
        res.status(401).json({ message: 'Error', error: "Invalid credentials." });
    }
    const correct_pw = await checkCorrectPassword(user.Password, password);
    try {
        if(user.Deleted){
            throw new Error("UNATHROIZED ERROR: This profile no longer exists. It was deleted.");
        }
        if (user.Email !== email || !correct_pw) {
            throw new Error("Invalid credentials.");
        }
        const payload = { id: user.Id, email: user.Email, role: user.Role };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        
        return res.status(200).json({token: token});
    } catch (error) {
        res.status(401).json({ message: 'Error', error: error.message });
    }
}