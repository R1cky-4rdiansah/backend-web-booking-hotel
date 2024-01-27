const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");
const AdminController = require("../controllers/AdminController");

router.get("/dashboard", AdminController.viewAdminDashboard);

//Route Category
router.get("/category", AdminController.viewAdminCategory);
router.post("/addCategory", AdminController.addCategory);
router.put("/updateCategory", AdminController.updateCategory);
router.delete("/deleteCategory/:id", AdminController.deleteCategory);

//Route Bank
router.get("/bank", AdminController.viewAdminBank);
router.post("/addBank", upload, AdminController.addBank);
router.put("/updateBank", AdminController.updateBank);
router.delete("/deleteBank/:id", AdminController.deleteBank);

router.get("/item", AdminController.viewAdminItem);
router.get("/booking", AdminController.viewAdminBooking);

module.exports = router;
