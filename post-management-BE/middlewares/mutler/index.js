const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/');
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
   }
});

const fileFilter = (req, file, cb) => {
   const fileTypes = /jpeg|jpg|png/;
   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
   const mimeType = fileTypes.test(file.mimetype);

   if (extName && mimeType) {
      cb(null, true);
   } else {
      cb(new Error('Only images (JPEG, JPG, PNG) are allowed!'), false);
   }
};

const upload = multer({
   storage: storage,
   limits: { fileSize: 2 * 1024 * 1024 },
   fileFilter: fileFilter
});

module.exports = upload;
