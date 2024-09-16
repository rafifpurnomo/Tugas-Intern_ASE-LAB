const connection = require('../config/database');
const bcrypt = require('bcrypt');

const loginMahasiswa = (username) => {
    const SQLQuery = "SELECT * FROM mahasiswa WHERE username = ? ";
    return connection.execute(SQLQuery, [username]);
};

const loginAdmin = (username) => {
    const SQLQuery = "SELECT * FROM admin WHERE username = ? ";
    return connection.execute(SQLQuery, [username]);
};

const registerMahasiswa = async (username ,plainPassword, nama, nim, jurusan, angkatan, role) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const SQLQuery = "INSERT INTO mahasiswa (username , password, nama, nim, jurusan, angkatan, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    return connection.execute(SQLQuery, [username, hashedPassword, nama, nim, jurusan, angkatan, role]);
}

const registerAdmin = async (username ,plainPassword, nama, nip, role) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const SQLQuery = "INSERT INTO admin (username , password, nama, nip, role) VALUES (?, ?, ?, ?, ?)";
    return connection.execute(SQLQuery, [username, hashedPassword, nama, nip, role]);
}

module.exports = {
    loginMahasiswa,
    loginAdmin,
    registerMahasiswa,
    registerAdmin,
};
