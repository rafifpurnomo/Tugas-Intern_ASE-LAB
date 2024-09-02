const pengajuanModel = require("../models/pengajuanKTM");

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

// Controller untuk menambahkan pengajuan KTM baru
const createPengajuan = async (req, res) => {
  const { id_akun, note, status } = req.body;
  const file = req.file;
  const tanggal_pengajuan = new Date();

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  try {
    await pengajuanModel.addPengajuan(
      id_akun,
      file.filename,
      note,
      tanggal_pengajuan,
      status || "di proses"
    );
    res.status(201).json({ message: "Pengajuan berhasil ditambahkan." });
  } catch (error) {
    res.status(500).json({
      message: "Error saat menambahkan pengajuan",
      serverMessage: error,
    });
  }
};

// Controller untuk memperbarui status pengajuan
const updateStatusPengajuan = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tanggal_pembaruan = new Date();

  // console.log("Request ID:", id);
  // console.log("Request Status:", status);
  // console.log("Tanggal Pembaruan:", tanggal_pembaruan);

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
    // // Ambil data buffer dari file PDF yang disimpan di database
    // const pdfBuffer = dataPengajuanKTM[0].file; // Kolom 'file' harus berupa buffer PDF

    // // Set header untuk mengembalikan file PDF
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', `attachment; filename=${dataPengajuanKTM[0].filename}`);

    // // Kirim buffer PDF sebagai respons
    // res.end(pdfBuffer); // Gunakan res.end untuk buffer

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
