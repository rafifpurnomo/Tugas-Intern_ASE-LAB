const connection = require('../config/database')

const getAllAdmin = () => {
    const SQLQuery = "SELECT * FROM admin"
    return connection.execute(SQLQuery);
}

const checkAdmin = (nip) => {
    const SQLQuery = "SELECT * FROM admin WHERE nip = ?";
    return connection.execute(SQLQuery, [nip]);
}

module.exports = {
    getAllAdmin,
    checkAdmin,
}