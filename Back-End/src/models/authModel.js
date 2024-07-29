const connection = require('../config/database');
const bcrypt = require('bcrypt');

const login = (username) => {
    const SQLQuery = "SELECT * FROM users WHERE nama = ? ";
    return connection.execute(SQLQuery, [username]);
};

const register = async (nim, username, plainPassword, role) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const SQLQuery = "INSERT INTO users (userNumber, nama, password, role) VALUES (?, ?, ?, ?)";
    return connection.execute(SQLQuery, [nim, username, hashedPassword, role]);
}

module.exports = {
    login,
    register,
};
