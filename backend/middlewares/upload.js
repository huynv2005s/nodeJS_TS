const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'diishpkrl',
    api_key: '711868672742911',
    api_secret: 'DkQ8TfVvH2v93kQVDdFIWNXM5oM',
});
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'avif', 'webp'],
    },
});

const upload = multer({ storage });
module.exports = upload
