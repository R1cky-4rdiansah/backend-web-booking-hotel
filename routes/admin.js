const express = require("express");
const router = express.Router();
const { upload, uploads, none } = require("../middlewares/multer");
const AdminController = require("../controllers/AdminController");
const auth = require("../middlewares/auth");

//Route Login
router.get("/login", AdminController.viewLogin);
router.post("/login", AdminController.loginAction);
router.post("/logout", AdminController.logoutAction);

router.use(auth);

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

//Feature Item
router.get("/item/feature/:id", AdminController.viewAdminItemFeature);
router.post("/item/feature/addFeature", upload, AdminController.addItemFeature);
router.put(
  "/item/feature/updateFeature",
  upload,
  AdminController.updateItemFeature
);
router.delete(
  "/item/feature/deleteFeature/:id",
  AdminController.deleteItemFeature
);

//Activity Item
router.get("/item/activity/:id", AdminController.viewAdminItemActivity);
router.post(
  "/item/activity/addActivity",
  upload,
  AdminController.addItemActivity
);
router.put(
  "/item/activity/updateActivity",
  upload,
  AdminController.updateItemActivity
);
router.delete(
  "/item/activity/deleteActivity/:id",
  AdminController.deleteItemActivity
);

//Booking Item
router.get("/booking", AdminController.viewAdminBooking);
router.get("/booking/:id", AdminController.showBooking);
router.post("/booking/action/:id", AdminController.actionBooking);

module.exports = router;
