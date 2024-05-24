const express = require("express");
const router = express.Router();
const { upload, uploads, none } = require("../middlewares/multer");
const AdminController = require("../controllers/AdminController");
const auth = require("../middlewares/auth");

//Route Login
router.get("/login", AdminController.viewLogin);
router.post("/login", AdminController.loginAction);
router.post("/logout", AdminController.logoutAction);

// router.use(auth);

router.get("/dashboard", auth, AdminController.viewAdminDashboard);

//Route Category
router.get("/category", auth, AdminController.viewAdminCategory);
router.post("/addCategory", auth, AdminController.addCategory);
router.put("/updateCategory", auth, AdminController.updateCategory);
router.delete("/deleteCategory/:id", auth, AdminController.deleteCategory);

//Route Bank
router.get("/bank", auth, AdminController.viewAdminBank);
router.post("/addBank", auth, upload, AdminController.addBank);
router.put("/updateBank", auth, upload, AdminController.updateBank);
router.delete("/deleteBank/:id", auth, AdminController.deleteBank);

//Route Item
router.get("/item", auth, AdminController.viewAdminItem);
router.post("/addItem", auth, uploads, AdminController.addItem);
router.get("/item/show-image/:id", auth, AdminController.showDetailItem);
router.put("/updateItem", auth, uploads, AdminController.updateItem);
router.delete(
  "/item/delete-image/:idItem/:idImage",
  auth,
  AdminController.deleteImageItem
);
router.delete("/deleteItem/:id", auth, AdminController.deleteItem);

//Feature Item
router.get("/item/feature/:id", auth, AdminController.viewAdminItemFeature);
router.post(
  "/item/feature/addFeature",
  auth,
  upload,
  AdminController.addItemFeature
);
router.put(
  "/item/feature/updateFeature",
  auth,
  upload,
  AdminController.updateItemFeature
);
router.delete(
  "/item/feature/deleteFeature/:id",
  auth,
  AdminController.deleteItemFeature
);

//Activity Item
router.get("/item/activity/:id", auth, AdminController.viewAdminItemActivity);
router.post(
  "/item/activity/addActivity",
  auth,
  upload,
  AdminController.addItemActivity
);
router.put(
  "/item/activity/updateActivity",
  auth,
  upload,
  AdminController.updateItemActivity
);
router.delete(
  "/item/activity/deleteActivity/:id",
  auth,
  AdminController.deleteItemActivity
);

//Booking Item
router.get("/booking", auth, AdminController.viewAdminBooking);
router.get("/booking/:id", auth, AdminController.showBooking);
router.post("/booking/action/:id", auth, AdminController.actionBooking);

module.exports = router;
