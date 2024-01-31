const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

function checkFileImage(file, cb) {
  const fileTypes = /jpg|jpeg|png|gif|jfif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeTypes = fileTypes.test(file.mimetype);
  if (extName && mimeTypes) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Errors, Hanya boleh gambar dengan ekstensi .jpg, .jpeg, .png, .gif, dan .jfif"
      )
    );
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileImage(file, cb);
  },
}).single("gambar");

const uploads = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileImage(file, cb);
  },
}).array("gambar");

module.exports = { upload, uploads };
