const express = require("express");
const router = express.Router();
const { upload, uploads } = require("../middlewares/multer");
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
router.put("/updateBank", upload, AdminController.updateBank);
router.delete("/deleteBank/:id", AdminController.deleteBank);

//Route Item
router.get("/item", AdminController.viewAdminItem);
router.post("/addItem", uploads, AdminController.addItem);
router.get("/item/show-image/:id", AdminController.showDetailItem);
router.put("/updateItem", uploads, AdminController.updateItem);
router.delete(
  "/item/delete-image/:idItem/:idImage",
  AdminController.deleteImageItem
);
router.delete("/deleteItem/:id", AdminController.deleteItem);

router.get("/booking", AdminController.viewAdminBooking);

module.exports = router;
