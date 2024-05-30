const express = require('express');
// const {authMiddleware} = require('../middlewares/authMiddleware');
const router= express.Router();
// const jwt = require('jsonwebtoken');
const verifyUser = require('../helpers/verifyUser') 
const cors=require('cors');
const { test, registerVendor, registerAdmin, forgetPassword, deleteaUser, updateaUser, handleRefreshToken, logout, resetPassword, verifyToken, getaVendor, deleteaVendor, updateaVendor, getaUserID, getaVendorID } = require('../controllers/authController');
// const { validateUserRegistration } = require('../helpers/userValidation');
const {registerUser, loginUser, getAllUser, getAllVendor,getaUser} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategory, createSubCategory, getAllCategory, deleteCategory, deleteSubCategory, getAllSubcategory, updateCategory, updateSubCategory } = require('../controllers/categoryController');
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
//category endpoint
router.post('/create_category', createCategory)
router.post('/create_subcategory', createSubCategory)
router.get('/accountmanagement/userlist', getAllUser)
router.get('/accountmanagement/vendorlist',getAllVendor)
router.get('/refreshToken', handleRefreshToken)
router.get('/get-user' ,authMiddleware, getaUser)
router.get('/get-userId/:id',getaUserID )
router.get('/get-vendorId/:id', getaVendorID)
router.get('/get-vendor',authMiddleware, getaVendor)
router.get ('/logout', logout)

router.delete('/delete-user/:id' , deleteaUser)
router.delete('/delete-vendor/:id' , deleteaVendor)
router.delete('/delete-category/:id', deleteCategory)
router.delete('/delete-subcategory/:id', deleteSubCategory)
router.put('/update-user' ,authMiddleware, updateaUser)
router.put('/update-vendor' ,authMiddleware, updateaVendor)
router.put('/update-category/:id', updateCategory)
router.put('/update-subcategory/:id', updateSubCategory)
router.post('/forget-password', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/verify',verifyUser, verifyToken)
router.get('/get_category', getAllCategory)
router.get('/get_subcategory', getAllSubcategory)

module.exports = router