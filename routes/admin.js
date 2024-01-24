const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/dashboard", AdminController.viewAdminDashboard);
router.get("/category", AdminController.viewAdminCategory);
router.get("/bank", AdminController.viewAdminBank);
router.get("/item", AdminController.viewAdminItem);
router.get("/booking", AdminController.viewAdminBooking);

module.exports = router;
