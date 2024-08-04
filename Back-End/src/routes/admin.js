const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getAllAdmin', adminController.getAllAdmin);
router.post('/addAdmin', adminController.createAdmin);

module.exports = router;