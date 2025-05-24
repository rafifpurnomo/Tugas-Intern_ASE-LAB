const connection = require('../config/database')

const getAllMahasiswa = () => {
    const SQLQuery = "SELECT * FROM mahasiswa"
    return connection.execute(SQLQuery);
}

const searchByID = (id) => {
    const SQLQuery = "SELECT * FROM mahasiswa WHERE id_users = ?"
    return connection.execute(SQLQuery, [id]);
}

const checkMahasiswa = (nim) => {
    const SQLQuery = "SELECT * FROM mahasiswa WHERE nim = ?";
    return connection.execute(SQLQuery, [nim]);
}

module.exports = {
    getAllMahasiswa,
    checkMahasiswa,
    searchByID,
}