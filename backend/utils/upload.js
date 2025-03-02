import multer from 'multer';
import path from 'path';

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/'); // Save videos in the 'uploads/videos' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Rename file to avoid conflicts
  },
});

// File filter to allow only video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only video files are allowed.'), false); // Reject the file
  }
};

// Initialize multer with the configured storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
});

export default upload;