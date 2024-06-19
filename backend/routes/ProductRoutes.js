const express = require('express');
const { createProduct, getAllProducts, getProductsOnsubcategoryId, getaProduct, updateProduct, deleteProduct, getProductOnvendorId } = require('../controllers/ProductController');
const upload = require('../middlewares/multer');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// const Grid = require('gridfs-stream');
// require('dotenv').config(); 

// const mongoURI = process.env.MONGO_URL;
// const conn = mongoose.createConnection(mongoURI);
// let gfs;
// conn.once('open', () => {
//     gfs= Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });
 
router.post('/create-product',upload.array('images', 5), createProduct);
router.get('/getAll-products', getAllProducts)
//finding product based on product id
router.get('/get-product/:id', getaProduct)
//finding product based on subcategory id
router.get('/getProduct/:id', getProductsOnsubcategoryId)
router.get('/getproductvendor/:id', getProductOnvendorId)
router.put('/update-product/:id', updateProduct)
router.delete('/delete-product/:id', deleteProduct)

module.exports = router;