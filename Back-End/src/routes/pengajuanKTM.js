const express = require("express");
const pengajuanKTMController = require("../controllers/PengajuanKTM.controller");
const router = express.Router();
const multer = require("../middleware/multerConfig");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/getAllpengajuanKTM", pengajuanKTMController.getAllPengajuan);
router.post(
  "/AddPengajuanKTM",
  multer.single("file"),
  verifyJWT,
  pengajuanKTMController.createPengajuan
);
router.put(
  "/UpdatePengajuanKTM/:id",
  verifyJWT,
  pengajuanKTMController.updateStatusPengajuan
);
router.get(
  "/getAllPengajuanByIDAKUN/:idAkun",
  pengajuanKTMController.getPengajuanByIDAKUN
);

module.exports = router;
