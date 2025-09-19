// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.

import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});   // Configure storage settings as needed

const upload = multer({ storage: storage });

export default upload;
