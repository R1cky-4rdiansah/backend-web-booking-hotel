const express = require("express");
const router = express.Router();
const {
  landingPage,
  detailPage,
  bookingPage,
} = require("../controllers/ApiController");
const { upload } = require("../middlewares/multer");

router.get("/landing-page", landingPage);
router.get("/detail-hotel/:id", detailPage);
router.post("/booking-post", upload, bookingPage);

module.exports = router;
