const connection = require('../config/database');

// Fungsi untuk mengambil semua data pengajuan KTM
const getAllPengajuanKTM = () => {
    const SQLQuery = "SELECT * FROM pengajuan_ktm";
    return connection.execute(SQLQuery);
}

// Fungsi untuk menambahkan pengajuan KTM
const addPengajuan = (id_users, filepath, note, tanggal_pengajuan, status) => {
    const SQLQuery = `
        INSERT INTO pengajuan_ktm (id_users, filepath, note, tanggal_pengajuan, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    return connection.execute(SQLQuery, [id_users, filepath, note, tanggal_pengajuan, status]);
}

// Fungsi untuk memperbarui status pengajuan KTM
const updatePengajuanStatus = (id, tanggal_pembaruan, status) => {
    const SQLQuery = `
        UPDATE pengajuan_ktm
        SET status = ?, tanggal_pembaruan = ?
        WHERE id_pengajuan_ktm = ?
    `;
    // console.log("SQL Query:", SQLQuery);
    // console.log("Parameters:", [status, tanggal_pembaruan, id]);
    return connection.execute(SQLQuery, [status, tanggal_pembaruan, id]);
}

const getPengajuanByid_user = (id_users) => {
    const SQLQuery = `SELECT * FROM pengajuan_ktm WHERE id_users = ?`;
    return connection.execute(SQLQuery, [id_users]);
}

module.exports = {
    getAllPengajuanKTM,
    addPengajuan,
    updatePengajuanStatus,
    getPengajuanByid_user,
}
