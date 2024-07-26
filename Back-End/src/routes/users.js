const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/', userController.getAllUser)
router.post('/', userController.createUser)

module.exports = router