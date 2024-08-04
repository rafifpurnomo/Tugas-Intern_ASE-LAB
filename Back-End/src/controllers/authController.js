const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
require("dotenv").config();

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cek di tabel mahasiswa
        const [mahasiswaRows] = await authModel.loginMahasiswa(username);
        if (mahasiswaRows.length > 0) {
            const mahasiswa = mahasiswaRows[0];
            const match = await bcrypt.compare(password, mahasiswa.password);
            if (match) {
                const token = jwt.sign({ id: mahasiswa.id, role: 'mahasiswa' }, process.env.JWT_SECRET, { expiresIn: '2h' });
                return res.status(200).json({
                    message: 'Login successful',
                    user: mahasiswa,
                    token
                });
            }
        }

        // Cek di tabel admin
        const [adminRows] = await authModel.loginAdmin(username);
        if (adminRows.length > 0) {
            const admin = adminRows[0];
            const match = await bcrypt.compare(password, admin.password);
            if (match) {
                const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
                return res.status(200).json({
                    message: 'Login successful',
                    user: admin,
                    token
                });
            }
        }

        // Jika tidak ditemukan di kedua tabel atau password salah
        return res.status(400).json({
            message: 'Username or password is incorrect'
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
  login,
};
