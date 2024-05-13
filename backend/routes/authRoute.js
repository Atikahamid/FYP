const express = require('express');
// const {authMiddleware} = require('../middlewares/authMiddleware');
const router= express.Router();
const jwt = require('jsonwebtoken');
const verifyUser = require('../helpers/verifyUser')
const cors=require('cors');
const { test, registerVendor, registerAdmin, forgetPassword, deleteaUser, updateaUser, handleRefreshToken, logout, resetPassword, verifyToken } = require('../controllers/authController');
// const { validateUserRegistration } = require('../helpers/userValidation');
const {registerUser, loginUser, getAllUser, getAllVendor,getaUser} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', test)
router.post('/registerUser', registerUser)
router.post('/login', loginUser)
router.post('/registerVendor', registerVendor)
router.post('/registerAdmin',registerAdmin)

router.get('/accountmanagement/userlist', getAllUser)
router.get('/accountmanagement/vendorlist',getAllVendor)
router.get('/refreshToken', handleRefreshToken)
router.get('/get-user' ,authMiddleware, getaUser)
router.get ('/logout', logout)

router.delete('/:id' , deleteaUser)
router.put('/update-user' ,authMiddleware, updateaUser)
router.post('/forget-password', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/verify',verifyUser, verifyToken)


module.exports = router