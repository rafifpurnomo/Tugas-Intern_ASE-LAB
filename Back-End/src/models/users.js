const connection = require('../config/database')

const getAllUser = () => {
    const SQLQuery = "SELECT * FROM users"
    return connection.execute(SQLQuery);
}

const userStatus = (nim) => {
    const SQLQuery = "SELECT * FROM users WHERE userNumber = ?";
    return connection.execute(SQLQuery, [nim]);
}

module.exports = {
    getAllUser,
    userStatus,
}