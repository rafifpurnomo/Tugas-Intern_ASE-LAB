const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
const userModel = require("../models/users");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await authModel.login(username);

    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.status(200).json({
          message: "Login successful",
          data
          // data: rows,
          // token,
        });
      } else {
        return res.status(400).json({
          massage: "Password salah",
          succes: false,
        });
      }
    } else {
      return res.status(400).json({
        massage: "username salah",
        succes: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { nim, username, password, role } = req.body;

  try {
    
    const [existingUser] = await userModel.userStatus(nim);
    if (existingUser.length > 0) {
        return res.status(400).json({
            message: 'NIM sudah terdaftar',
            success: false,
        });
    }

    await authModel.register(nim, username, password, role);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  login,
  registerUser,
};
