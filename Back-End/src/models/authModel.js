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

const registerMahasiswa = async (username ,plainPassword, nama, nim, jurusan, angkatan) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const SQLQuery = "INSERT INTO mahasiswa (username , password, nama, nim, jurusan, angkatan) VALUES (?, ?, ?, ?, ?, ?)";
    return connection.execute(SQLQuery, [username, hashedPassword, nama, nim, jurusan, angkatan]);
}

const registerAdmin = async (username ,plainPassword, nama, nip) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const SQLQuery = "INSERT INTO admin (username , password, nama, nip) VALUES (?, ?, ?, ?)";
    return connection.execute(SQLQuery, [username, hashedPassword, nama, nip]);
}

module.exports = {
    loginMahasiswa,
    loginAdmin,
    registerMahasiswa,
    registerAdmin,
};
