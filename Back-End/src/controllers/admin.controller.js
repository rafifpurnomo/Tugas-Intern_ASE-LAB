const adminModel = require("../models/admin");
const authModel = require("../models/authModel");

const getAllAdmin = async (req, res) => {
  try {
    const [data] = await adminModel.getAllAdmin();

    res.json({
      massage: "Menampilkan data admin",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      massage: "Error ",
      serverMassage: error,
    });
  }
};

const createAdmin = async (req, res) => {
  const { username, password, nama, nip } = req.body;
  const role = "admin";

  try {
    const [existingUser] = await adminModel.checkAdmin(nip);
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "NIP sudah terdaftar",
        success: false,
      });
    }

    await authModel.registerAdmin(username, password, nama, nip, role);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllAdmin,
  createAdmin,
};
