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
  const fileTypes = /jpg|jpeg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeTypes = fileTypes.test(file.mimeType);
  if (extName && mimeTypes) {
    cb(null, true);
  } else {
    cb(
      "Errors, Hanya boleh gambar dengan ekstensi .jpg, .jpeg, .png, dan .gif"
    );
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("gambar");

module.exports = { upload };
