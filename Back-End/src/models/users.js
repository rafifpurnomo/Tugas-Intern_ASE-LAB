const connection = require('../config/database')

const getAllUser = () => {
    const SQLQuery = "SELECT * FROM users"
    return connection.execute(SQLQuery);
}

module.exports = {
    getAllUser,
}