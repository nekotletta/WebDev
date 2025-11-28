const { connectDB, sql } = require('../config/db');
const bcrypt = require('bcrypt');

async function getUsers() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [User]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getUserById(id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .query('SELECT Id, Email, FirstName, LastName, Description, Role, Deleted FROM [User] WHERE Id = @Id');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createUser(data) {
    try {
        let connection = await connectDB();
        let password = data.password;

        // password is not checked in the validator. makes sense to use the same one 
        // for both creation and editing, but it leads to the possibility of not having passwords at all
        // also makes sense to not check it since there are no security reqs
        if(!password){
            // bad_request true to use a unique name in userService
            // this allows to check, if it's true, then return a 400 error specifically.
            // if i just throw a new error like catch, that returns a 500 error, which is incorrect
            return { bad_request: true, message: 'Password is required.' };
        }
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        let result = await connection.request()
            .input('email', sql.VarChar, data.email)
            .input('password', sql.VarChar, hashedPassword)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role)
            .input('description', sql.VarChar, data.description)
            .input('registeredon', sql.DateTime2, new Date())
            .query(`
                INSERT INTO [User] (Email, Password, FirstName, LastName, Role, RegisteredOn, Description)
                VALUES (@email, @password, @firstname, @lastname, @role, @registeredon, @description);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    } catch (err) {
        throw new Error(err.message);
    } 
}

async function updateUser(id, data) {
    try {
        let connection = await connectDB();

        // i get why we're not allowed to edit passwords, but still
        // include the hashing code anyway
        // let password = data.password;
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);


        await connection.request()
            .input('id', sql.Int, id)
            .input('email', sql.VarChar, data.email)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role)
            .input('description', sql.VarChar, data.description)
            .input('deleted', sql.VarChar, data.deleted)

            .query(`
                UPDATE [User] SET Email = @email, FirstName = @firstname, LastName = @lastname, Role = @role, Description = @description, Deleted = @deleted
                WHERE Id = @id
            `);
        return true;
    } catch (err) {
        throw new Error(err.message);
    } 
}

async function deleteUser(id) {
    try {
        let connection = await connectDB();

        await connection.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM [User] WHERE Id = @Id');
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };