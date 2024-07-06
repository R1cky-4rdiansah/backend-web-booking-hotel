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
  myProfile,
} = require("../controllers/ApiController");
const { upload } = require("../middlewares/multer");
const JWTAuth = require("../middlewares/jwtAuth");

router.get("/landing-page", landingPage);
router.get("/detail-hotel/:id", JWTAuth, detailPage);
router.get("/detail-order/:invoice", JWTAuth, orderDetails);
router.post("/booking-post", JWTAuth, upload, bookingPage);
router.get("/find-page", findPage);
router.get("/storie-page", JWTAuth, storiePage);
router.post("/my-storie", JWTAuth, myStorie);
router.post("/post-rating", JWTAuth, upload, sendRate);
router.post("/login", loginApi);
router.post("/register", registerApi);
router.post("/my-profile", JWTAuth, myProfile);

module.exports = router;
