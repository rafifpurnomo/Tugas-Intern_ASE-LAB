const connection = require('../config/database')

const getAllAdmin = () => {
    const SQLQuery = "SELECT * FROM admin"
    return connection.execute(SQLQuery);
}

const searchByID = (id) => {
    const SQLQuery = "SELECT * FROM admin WHERE id_admin = ?"
    return connection.execute(SQLQuery, [id]);
}

const checkAdmin = (nip) => {
    const SQLQuery = "SELECT * FROM admin WHERE nip = ?";
    return connection.execute(SQLQuery, [nip]);
}

module.exports = {
    getAllAdmin,
    checkAdmin,
    searchByID,
}