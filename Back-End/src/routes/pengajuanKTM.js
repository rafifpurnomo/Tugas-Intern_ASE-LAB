const express = require("express");
const pengajuanKTMController = require("../controllers/PengajuanKTM.controller");
const router = express.Router();
const multer = require("../middleware/multerConfig")


// Route untuk mengambil semua pengajuan KTM
router.get("/getAllpengajuanKTM", pengajuanKTMController.getAllPengajuan);

// Route untuk membuat pengajuan KTM baru
router.post("/AddPengajuanKTM", multer.single("file"), pengajuanKTMController.createPengajuan);

// Route untuk memperbarui status pengajuan KTM
router.put("/UpdatePengajuanKTM/:id", pengajuanKTMController.updateStatusPengajuan);

// Route untuk mengambil semua pengajuan berdasarkan ID_AKUN
router.get("/getAllPengajuanByIDAKUN/:idAkun", pengajuanKTMController.getPengajuanByIDAKUN);

module.exports = router;
