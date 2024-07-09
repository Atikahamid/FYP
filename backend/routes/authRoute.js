const express = require('express');
// const {authMiddleware} = require('../middlewares/authMiddleware');
const router= express.Router();
const upload = require('../middlewares/multer2');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const verifyUser = require('../helpers/verifyUser') 
const cors=require('cors');
const { test, registerVendor, registerAdmin, forgetPassword, deleteaUser, updateaUser, handleRefreshToken, logout, resetPassword, verifyToken, getaVendor, deleteaVendor, updateaVendor, getaUserID, getaVendorID } = require('../controllers/authController');
// const { validateUserRegistration } = require('../helpers/userValidation');
const {registerUser, loginUser, getAllUser, getAllVendor,getaUser} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategory, createSubCategory, getAllCategory, deleteCategory, deleteSubCategory, getAllSubcategory, updateCategory, updateSubCategory, getsubcategoryOnCatId } = require('../controllers/categoryController');
const { addToCart, getUserCart, updateCart, deleteCart, deleteaSingle } = require('../controllers/cartController');
const { getAProduct } = require('../controllers/ProductController');

// const Grid = require('gridfs-stream');
// require('dotenv').config();

// const mongoURI = process.env.MONGO_URL;
// const conn = mongoose.createConnection(mongoURI);
// let gfs;
// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads')
// });

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
router.post('/create_subcategory',upload.single('image'), createSubCategory)
router.get('/accountmanagement/userlist', getAllUser)
router.get('/accountmanagement/vendorlist',getAllVendor)
router.get('/refreshToken', handleRefreshToken)
router.get('/get-user' ,authMiddleware, getaUser)
router.post('/getAProduct', getAProduct);
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
router.put('/update-subcategory/:id',upload.single('image'), updateSubCategory)
router.post('/forget-password', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/verify',verifyUser, verifyToken)
router.get('/get_category', getAllCategory)
router.get('/get_subcategory', getAllSubcategory)
router.get('/subCategoryOnId/:id', getsubcategoryOnCatId)

//cart
router.post('/add-to-cart', authMiddleware, addToCart)
router.get('/user-cart', authMiddleware, getUserCart)
router.put('/update-cart', authMiddleware, updateCart)
router.delete('/delete-cart', authMiddleware, deleteCart)
router.delete('/deleteCart/:id', authMiddleware, deleteaSingle)
module.exports = router