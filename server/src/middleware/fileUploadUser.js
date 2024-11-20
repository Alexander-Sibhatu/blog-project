const multer = require('multer');
const path = require('path');

const FILE_SIZE = 1024 * 1024 * 2; // Limit file size to 2MB for user profiles
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/users')); // Set user-specific upload folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadUser = multer({ storage: storage, limits: { fileSize: FILE_SIZE }});

module.exports = uploadUser;
