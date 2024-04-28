const express = require('express');
const router= express.Router();
const cors=require('cors');
const { test } = require('../controllers/authController');
const { validateUserRegistration } = require('../helpers/userValidation');
const userController = require('../controllers/authController')
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register',validateUserRegistration, userController.registerUser)

module.exports = router