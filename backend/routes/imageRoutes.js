const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const router = express.Router();
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once('open', () => {

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Specify the collection to use
    
});

// Route to fetch image by ID
router.get('/image/:id', async(req, res) => {
    const fileId = new mongoose.Types.ObjectId (req.params.id);

   const file= await gfs.files.findOne({ _id: fileId }, (err, file) => {
        if (err || !file) {
            console.error('File not found or error:', err || 'No file');
            return res.status(404).json({ err: 'No file exists' });
        }

        if (file.contentType.startsWith('image/')) {
            const readStream = gfs.createReadStream({ _id: file._id });
            readStream.on('error', (error) => {
                console.error('Error reading stream:', error);
                res.status(500).json({ err: 'Error reading stream' });
            });
            res.set('Content-Type', file.contentType);
            // res.json({msg: 'reading file', data: file.contentType})
            readStream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    });
    res.json(file);
});

//get all image files
router.get('/image', async(req, res) => {
    if (!gfs) {
        return res.status(500).json({ err: 'GridFS not initialized' });
    }
   const file = await gfs.files.find().toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                err: 'No files exits'
            });
        }
    })
    return res.json(file);
})

module.exports = router;
