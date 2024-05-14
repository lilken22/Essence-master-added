const express = require('express');
const router = express.Router()
const {postRegister, postLogin, logout} = require("../controllers/authController")


router.post('/register', postRegister)
router.post('/login', postLogin)
router.get('/logout', logout)

module.exports = router