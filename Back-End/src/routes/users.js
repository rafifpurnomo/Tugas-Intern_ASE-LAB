const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/getAllUser', userController.getAllUser)
router.post('/addUser', userController.createUser)

module.exports = router