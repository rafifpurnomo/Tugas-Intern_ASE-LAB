const usersModel = require("../models/mahasiswa");
const authModel = require("../models/authModel");

const getAllMahasiswa = async (req, res) => {
  try {
    const [data] = await usersModel.getAllMahasiswa();

    res.json({
      massage: "Menampilkan data User",
      data: data,
    });
  } catch (error) {
    res.status(500).json ({
        massage: "Error ",
        serverMassage: error,
    })
  }
};

const createMahasiswa = async (req, res) => {
  const { username , password, nama, nim, jurusan, angkatan } = req.body;

  try {
    
    const [existingUser] = await usersModel.checkMahasiswa(nim);
    if (existingUser.length > 0) {
        return res.status(400).json({
            message: 'NIM sudah terdaftar',
            success: false,
        });
    }

    await authModel.registerMahasiswa(username , password, nama, nim, jurusan, angkatan);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllMahasiswa,
  createMahasiswa,
};
