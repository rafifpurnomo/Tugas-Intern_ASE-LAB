const express = require('express');
const router = express.Router();
const userController = require('../controllers/mahasiswa.controller');

router.get('/getAllMahasiswa', userController.getAllMahasiswa);
router.post('/addMahasiswa', userController.createMahasiswa);

module.exports = router;