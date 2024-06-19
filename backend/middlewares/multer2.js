const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../helpers/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Sub category',
    format: async (req, file) => 'jpeg', // supports promises as well
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;