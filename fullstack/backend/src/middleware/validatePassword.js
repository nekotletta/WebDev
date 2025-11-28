const { connectDB, sql } = require('../config/db');
const bcrypt = require('bcrypt');
// Check that the user entered a degree id that exists in the Degree table
// cant hardcode them, as theyre not pre made like the roles
async function checkCorrectPassword(hashed_password, plain_password) {

    let password_match = await bcrypt.compare(plain_password, hashed_password);
    // password is matched against the hash value
    if(password_match){
        return true

    // in this project, some students didn't hash the password when creating their profiles,
    // if this was the case, check that the user put the correct plain text
    } else {
        return (plain_password.trim() == hashed_password.trim())
    }
}

module.exports = { checkCorrectPassword };