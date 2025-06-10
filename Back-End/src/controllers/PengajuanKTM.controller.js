const pengajuanModel = require("../models/pengajuanKTM");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");
const path = require("path");
const crypto = require("crypto");

// Controller untuk mengambil semua pengajuan KTM
const getAllPengajuan = async (req, res) => {
  try {
    const [data] = await pengajuanModel.getAllPengajuanKTM();
    res.json({
      message: "Menampilkan data pengajuan",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saat mengambil data",
      serverMessage: error,
    });
  }
};

const createPengajuan = async (req, res) => {
  const { note } = req.body;
  const id_users = req.id;
  const status = "diproses";
  const file = req.file;
  const tanggal_pengajuan = new Date();

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  try {
    const downloadURL = await uploadKTMImg(file);

    await pengajuanModel.addPengajuan(
      id_users,
      downloadURL,
      note,
      tanggal_pengajuan,
      status
    );

    res.status(201).json({
      message: "Pengajuan berhasil ditambahkan.",
      file: file.originalname,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saat menambahkan pengajuan",
      serverMessage: error.message,
    });
  }
};

const uploadKTMImg = async (KTMImg) => {
  try {
    if (!KTMImg) {
      throw new Error("File tidak valid");
    }

    const KTMImgExtension = path.extname(KTMImg.originalname);
    const KTMImgOriginalName = path.basename(
      KTMImg.originalname,
      KTMImgExtension
    );
    const newKTMImgName = `${Date.now()}_${KTMImgOriginalName}${KTMImgExtension}`;

    const { firebaseStorage } = await firebaseConfig();
    const storageRef = ref(firebaseStorage, `pengajuanKTM/${newKTMImgName}`);

    const KTMImgBuffer = KTMImg.buffer;

    const resultKTMImg = await uploadBytes(storageRef, KTMImgBuffer, {
      contentType: KTMImg.mimetype,
    });

    return await getDownloadURL(resultKTMImg.ref);
  } catch (error) {
    console.error("Error saat foto KTM:", error.message);
    throw new Error("Gagal mengunggah foto KTM.");
  }
};

// Controller untuk memperbarui status pengajuan
const updateStatusPengajuan = async (req, res) => {
  const { id } = req.params;
  const role = req.role;
  const { status } = req.body;
  const tanggal_pembaruan = new Date();

  try {
    if (role === "admin") {
      await pengajuanModel.updatePengajuanStatus(id, tanggal_pembaruan, status);
      res
        .status(200)
        .json({ message: "Status pengajuan berhasil diperbarui." });
    } else {
      res
        .status(403)
        .json({
          message:
            "Akses ditolak. Hanya admin yang dapat memperbarui status pengajuan.",
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error saat memperbarui status pengajuan",
      serverMessage: error.message || error,
    });
  }
};

const getPengajuanByIDUSER = async (req, res) => {
  const { id_users } = req.params;

  try {
    const [dataPengajuanKTM] = await pengajuanModel.getPengajuanByid_user(id_users);

    if (dataPengajuanKTM.length === 0) {
      return res.status(404).json({
        message: `Pengajuan KTM untuk ID AKUN ${id_users} tidak ditemukan`,
        success: false,
      });
    }
    res.status(200).json({
      message: `Pengajuan KTM dengan ID AKUN ${id_users} berhasil diambil`,
      success: true,
      data: dataPengajuanKTM,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllPengajuan,
  createPengajuan,
  updateStatusPengajuan,
  getPengajuanByIDUSER,
};
