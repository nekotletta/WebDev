const { connectDB, sql } = require('../config/db');
// const { updateUser } = require('../controllers/userController');
const { validateUserExists } = require("../validators/userValidation");
// to encrypt passwords | source: https://blog.logrocket.com/password-hashing-node-js-bcrypt/
const bcrypt = require('bcrypt');


// MOVER TODA ESTA FUNCIONALIDAD A SERVICES EN VEZ DE AQUI
// IMPORT USERERVICE
// RESULT = AWAIT USERSERVICE.GETUSERS

async function getUsers() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [User]');
        return result.recordset;
    } catch(err) {
        throw new Error(err.message);
    }
}

async function createUser(userData) {
    try {
        const connection = await connectDB();
        // read from postman. make json will all fields in table 
        const { Email, Password, FirstName, LastName } = userData; // Destructure the user data

        // generate times dynamically as opposed to hardcoding 
        // this field cant be null 
        const registeredOn = new Date();

        // hash the password before inserting
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(Password, salt);

        await connection.request() 
            .input('Email', sql.NVarChar, Email)
            .input('Password', sql.NVarChar, hashedPassword) 
            .input('FirstName', sql.NVarChar, FirstName)
            .input('LastName', sql.NVarChar, LastName)
            .input('RegisteredOn', sql.DateTime, registeredOn) 
            .query('INSERT INTO [User] (Email, Password, FirstName, LastName, RegisteredOn) VALUES (@Email, @Password, @FirstName, @LastName, @RegisteredOn)');
        
        return { message: 'User added successfully.' };
    } catch (err) {
        throw new Error(err.message);
    }
}

// get user by id from the url
async function getUserById(Id) {
    
    // const { Id } = userObj;
    const userExists = await validateUserExists(Id);
    if (!userExists) {
        return { message: "This user doesn't exist." }; 
    }

    const connection = await connectDB();
    // retrieve the user associated with the id
    // if i dont pass the id it says i need to declare Id, idk 

    // return the whole user object, with all fields
    let query = await connection.request()
        .input('Id', sql.Int, Id) 
        .query("SELECT * FROM [User] WHERE Id = @Id");

    return query.recordset;
};

async function updateUser(userObj) {
    try {
        const { UserId, New_Email, New_PW, New_FN, New_LN } = userObj;
        const userExists = await validateUserExists(UserId);
        if (!userExists) {
            return { message: "This user doesn't exist." }; 
        }

        const connection = await connectDB();
        

        // to store hashed passwords
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(New_PW, salt);

        // how to compare passwords, read from parameters (for notes, as it's not used here)
        // const isMatch = await bcrypt.compare(og_passwords, hashedPassword);

        // retrieve the user associated with the id
        // if i dont pass the id it says i need to declare Id, idk 
        await connection.request()
            .input('Id', sql.Int, UserId)
            .input('New_Email', sql.NVarChar, New_Email)
            .input('New_PW', sql.NVarChar, hashedPassword)
            .input('New_FN', sql.NVarChar, New_FN)
            .input('New_LN', sql.NVarChar, New_LN)
            .query("UPDATE [User] SET Email = @New_Email, Password = @New_PW, FirstName = @New_FN, LastName = @New_LN WHERE Id = @Id")

        
        return { message: `Info for user ${New_Email}  successfully.` };
    } catch (error) {
        throw new Error(error.message);
    }
    
};

async function deleteUser(userID) {
    try {
        // read the fields from postman
        // put the validation inside the deleteUser model to not cause problems 
        const userExists = await validateUserExists(userID);
        if (!userExists) {
            return { message: "This user doesn't exist." }; 
        }

        const connection = await connectDB();
        await connection.request()
        .input('Id', sql.Int, userID)
        .query("DELETE FROM [User] WHERE Id = @Id"); 

        return { message: 'User deleted successfully.' };
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getUsers, createUser, deleteUser, updateUser, getUserById };