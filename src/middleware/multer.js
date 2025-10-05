const multer = require("multer");
const path = require("path");
const fs = require("fs");

// STATIC FILE - LOCAL STORAGE
const uploadDir = path.join(__dirname, "../uploads/templates");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = path.basename(file.originalname, path.extname(file.originalname));
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}_${originalName}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
  ) {
      cb(null, true);
  } else {
      const errMsg = 'Hanya boleh upload gambar (jpeg, jpg, png)';
      req.fileValidationError = errMsg;
      return cb(new Error(errMsg), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;
