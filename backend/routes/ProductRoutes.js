const express = require('express');
const { createProduct } = require('../controllers/ProductController');
const upload = require('../helpers/gridfs');
const mongoose = require('mongoose');

const router = express.Router();

const Grid = require('gridfs-stream');
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
    gfs= Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

router.post('/',upload.array('images', 5), createProduct);

module.exports = router;