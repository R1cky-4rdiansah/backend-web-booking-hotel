const express = require("express");
const router = express.Router();
const {
  landingPage,
  detailPage,
  bookingPage,
  orderDetails,
  loginApi,
  registerApi,
} = require("../controllers/ApiController");
const { upload, none } = require("../middlewares/multer");
const JWTAuth = require("../middlewares/jwtAuth");

router.get("/landing-page", landingPage);
router.get("/detail-hotel/:id", JWTAuth, detailPage);
router.get("/detail-order/:invoice", JWTAuth, orderDetails);
router.post("/booking-post", JWTAuth, upload, bookingPage);
router.post("/login", loginApi);
router.post("/register", registerApi);

module.exports = router;
