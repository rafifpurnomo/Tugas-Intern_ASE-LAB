const pengajuanModel = require("../models/pengajuanKTM");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require('../config/firebase.config')
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
  const { id_akun, note, status } = req.body;
  const file = req.file;
  const tanggal_pengajuan = new Date();

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  try {
    const randomString = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(file.originalname); 
    const randomFileName = `${randomString}${fileExtension}`; 
    const { firebaseStorage } = await firebaseConfig();
    const storageRef = ref(firebaseStorage, `${randomFileName}`); 
    const fileBuffer = file.buffer; 
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: file.mimetype, 
    });
    const downloadURL = await getDownloadURL(snapshot.ref);

    await pengajuanModel.addPengajuan(
      id_akun,
      downloadURL,
      note,
      tanggal_pengajuan,
      status || "di proses"
    );

    res.status(201).json({ 
      message: "Pengajuan berhasil ditambahkan.",
      file: file.originalname 
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saat menambahkan pengajuan",
      serverMessage: error.message,
    });
  }
};

// Controller untuk memperbarui status pengajuan
const updateStatusPengajuan = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tanggal_pembaruan = new Date();
  try {
    await pengajuanModel.updatePengajuanStatus(id, tanggal_pembaruan, status);
    res.status(200).json({ message: "Status pengajuan berhasil diperbarui." });
  } catch (error) {
    res.status(500).json({
      message: "Error saat memperbarui status pengajuan",
      serverMessage: error,
    });
  }
};

const getPengajuanByIDAKUN = async (req, res) => {
  const { idAkun } = req.params;

  try {
    const dataPengajuanKTM = await pengajuanModel.getPengajuanByIDAKUN(idAkun);

    if (dataPengajuanKTM.length === 0) {
      return res.status(404).json({
        message: `Pengajuan KTM untuk ID AKUN ${idAkun} tidak ditemukan`,
        success: false,
      });
    }
    res.status(200).json({
      message: `Pengajuan KTM dengan ID AKUN ${idAkun} berhasil diambil`,
      success: true,
      data: dataPengajuanKTM,
    });
    
  } catch (error) {
    res.status(500).json({
        message: 'Server error',
        success: false,
        error: error.message,
      });
  }
};

module.exports = {
  getAllPengajuan,
  createPengajuan,
  updateStatusPengajuan,
  getPengajuanByIDAKUN,
  
};
