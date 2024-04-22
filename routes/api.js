const express = require("express");
const router = express.Router();
const {
  landingPage,
  detailPage,
  bookingPage,
  orderDetails,
  loginApi,
  registerApi,
  findPage,
  authenticate,
  storiePage,
  sendRate,
  myStorie,
} = require("../controllers/ApiController");
const { upload, none } = require("../middlewares/multer");
const JWTAuth = require("../middlewares/jwtAuth");
const multer = require("multer");

router.get("/landing-page", landingPage);
router.get("/detail-hotel/:id", JWTAuth, detailPage);
router.get("/detail-order/:invoice", JWTAuth, orderDetails);
router.post("/booking-post", JWTAuth, upload, bookingPage);
router.get("/find-page", findPage);
router.post("/storie-page", JWTAuth, storiePage);
router.post("/my-storie", JWTAuth, myStorie);
router.post("/post-rating", JWTAuth, upload, sendRate);
router.post("/login", loginApi);
router.post("/register", registerApi);

module.exports = router;
