import multer from "multer";
import path from 'path';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/img');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now().toString().slice(0, 10) + '-';
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + file.fieldname + ext);
  }
});

export const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/svg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg and svg are allowed!'));
  }
};
