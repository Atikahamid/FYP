const express = require('express');
// const {authMiddleware} = require('../middlewares/authMiddleware');
const router= express.Router();
const jwt = require('jsonwebtoken');

const cors=require('cors');
const { test, registerVendor, registerAdmin, forgetPassword, deleteaUser, updateaUser } = require('../controllers/authController');
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
router.get('/:id' ,authMiddleware, getaUser)
router.delete('/:id' , deleteaUser)
router.put('/:id' ,authMiddleware, updateaUser)

router.post('/forget-password', forgetPassword)



module.exports = router