const CategoryModel = require("../models/Category");
const BankModel = require("../models/Bank");
const ItemModel = require("../models/Item");
const ImageModel = require("../models/Image");
const FeatureModel = require("../models/Feature");
const ActivityModel = require("../models/Activity");
const UserModel = require("../models/Users");
const BookingModel = require("../models/Booking");
const MemberModel = require("../models/Member");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.mongo;
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { group } = require("console");

module.exports = {
  viewLogin: (req, res) => {
    try {
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          status: req.flash("status"),
          message: req.flash("info"),
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  loginAction: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        req.flash("status", "danger");
        req.flash("info", "Username yang kamu input tidak ada nih!");
        res.redirect("/admin/login");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        req.flash("status", "danger");
        req.flash("info", "Password yang kamu input tidak sama nih!");
        res.redirect("/admin/login");
      }

      req.session.user = {
        userId: user._id,
        username,
      };

      res.redirect("/admin/dashboard");
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  logoutAction: async (req, res) => {
    req.session.destroy();
    res.json({ message: "Logout" }, 200);
  },
  viewAdminDashboard: async (req, res) => {
    try {
      const user = req.session.user.username;

      const member = await MemberModel.find({}).count();
      const item = await ItemModel.find({}).count();
      const booking = await BookingModel.find({}).count();

      const year = new Date().getFullYear();

      const dataBooking = await BookingModel.aggregate([
        {
          $match: {
            bookingStartDate: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$bookingStartDate" },
              year: { $year: "$bookingStartDate" },
            },
            totalPrice: { $sum: "$total" },
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      // const dataBooking = await BookingModel.find({
      //   "payments.status": "Terima",
      //   bookingStartDate: {
      //     $gte: `${year}-01-01`,
      //     $lt: `${year + 1}-01-01`,
      //   },
      // });

      var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      if (dataBooking.length > 0) {
        dataBooking.forEach((val) => {
          const bulan = val._id.month - 1;
          for (let i = 0; i < 12; i++) {
            if (i == bulan) {
              data[i] += val.totalPrice;
            } else {
              data[i] += 0;
            }
          }
        });
      }

      res.render("admin/dashboard/admin-dashboard", {
        data,
        user,
        member,
        item,
        booking,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  viewAdminCategory: async (req, res) => {
    try {
      const data = await CategoryModel.find({});
      const user = req.session.user.username;

      res.render("admin/category/admin-category", {
        data,
        message: req.flash("info"),
        status: req.flash("status"),
        user,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await CategoryModel.create({ name });
      req.flash("info", "Data berhasil disimpan");
      req.flash("status", "success");

      res.redirect("/admin/category");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/category");
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name, id } = req.body;
      await CategoryModel.findByIdAndUpdate(id, { name: name });
      req.flash("info", "Data berhasil diupdate");
      req.flash("status", "warning");

      res.redirect("/admin/category");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await CategoryModel.findByIdAndDelete(id);
      req.flash("info", "Data berhasil dihapus");
      req.flash("status", "danger");

      res.redirect("/admin/category");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/category");
    }
  },
  viewAdminBank: async (req, res) => {
    try {
      const data = await BankModel.find({});

      res.render("admin/bank/admin-bank", {
        data,
        message: req.flash("info"),
        status: req.flash("status"),
        user: req.session.user.username,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  addBank: async (req, res) => {
    try {
      const { name, noRekening, nameBank } = req.body;
      const file = req.file.filename;
      req.flash("info", "Data berhasil disimpan");
      req.flash("status", "success");

      await BankModel.create({
        name,
        noRekening,
        nameBank,
        imageUrl: `images/${file}`,
      });

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/bank");
    }
  },
  updateBank: async (req, res) => {
    try {
      const { id, nameBank, noRekening, name, imageUrl } = req.body;

      const dataAwal = await BankModel.findById(id);

      if (req.file == undefined) {
        await BankModel.findByIdAndUpdate(id, {
          name,
          nameBank,
          noRekening,
        });
      } else {
        const file = req.file.filename;
        await BankModel.findByIdAndUpdate(id, {
          name,
          nameBank,
          noRekening,
          imageUrl: `images/${file}`,
        });
        if (fs.existsSync("./public/" + dataAwal.imageUrl)) {
          fs.unlinkSync("./public/" + dataAwal.imageUrl);
        }
      }

      req.flash("info", "Data berhasil diupdate");
      req.flash("status", "warning");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/bank");
    }
  },
  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const dataAwal = await BankModel.findById(id);
      if (fs.existsSync("./public/" + dataAwal.imageUrl)) {
        fs.unlinkSync("./public/" + dataAwal.imageUrl);
      }
      await BankModel.findByIdAndDelete(id);

      req.flash("info", "Data berhasil dihapus");
      req.flash("status", "danger");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/bank");
    }
  },
  viewAdminItem: async (req, res) => {
    try {
      const data = await ItemModel.find()
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({
          path: "categoryId",
          select: "id name",
        });

      const category = await CategoryModel.find({});

      res.render("admin/item/admin-item", {
        data,
        category,
        message: req.flash("info"),
        status: req.flash("status"),
        user: req.session.user.username,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  addItem: async (req, res) => {
    try {
      const { category, title, price, country, city, description } = req.body;
      const gambar = req.files;
      if (gambar.length > 0) {
        const CategoryData = await CategoryModel.findById(category);
        const ItemData = {
          categoryId: category,
          title,
          price,
          country,
          city,
          description,
        };
        const ItemSave = await ItemModel.create(ItemData);
        CategoryData.itemId.push({ _id: ItemSave._id });
        await CategoryData.save();

        for (let index = 0; index < gambar.length; index++) {
          const ImageSave = await ImageModel.create({
            imageUrl: `images/${gambar[index].filename}`,
          });

          ItemSave.imageId.push({ _id: ImageSave._id });
          await ItemSave.save();
        }
      }
      req.flash("info", "Data berhasil disimpan");
      req.flash("status", "success");

      res.redirect("/admin/item");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/item");
    }
  },
  updateItem: async (req, res) => {
    try {
      const { category, title, price, country, city, description, id } =
        req.body;
      const gambar = req.files;
      const ItemData = {
        categoryId: category,
        title,
        price,
        country,
        city,
        description,
      };

      //Remove id categoryy
      const itemAwal = await ItemModel.findById(id);
      await CategoryModel.findByIdAndUpdate(itemAwal.categoryId, {
        $pull: { itemId: new ObjectId(itemAwal._id) },
      });

      //Update Data
      await ItemModel.findByIdAndUpdate(id, ItemData);

      //Add id category
      const itemUpdate = await ItemModel.findById(id);
      await CategoryModel.findByIdAndUpdate(itemUpdate.categoryId, {
        $push: { itemId: itemUpdate._id },
      });

      if (gambar.length > 0) {
        for (let index = 0; index < gambar.length; index++) {
          const ImageSave = await ImageModel.create({
            imageUrl: `images/${gambar[index].filename}`,
          });

          itemUpdate.imageId.push({ _id: ImageSave._id });
          await itemUpdate.save();
        }
      }

      req.flash("info", "Data berhasil diupdate");
      req.flash("status", "warning");

      res.redirect("/admin/item");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/item");
    }
  },
  showDetailItem: async (req, res) => {
    const { id } = req.params;
    const dataItem = await ItemModel.findById(id)
      .populate({
        path: "imageId",
        select: "imageUrl",
      })
      .populate({
        path: "categoryId",
        select: "name",
      });

    const category = await CategoryModel.find({});

    res.json({ dataItem, category });
  },
  deleteImageItem: async (req, res) => {
    const { idItem, idImage } = req.params;

    const dataImage = await ImageModel.findById(idImage);

    //Delete Item
    if (fs.existsSync("./public/" + dataImage.imageUrl)) {
      fs.unlinkSync("./public/" + dataImage.imageUrl);
    }
    await ItemModel.findByIdAndUpdate(idItem, {
      $pull: { imageId: new ObjectId(idImage) },
    });
    await ImageModel.findByIdAndDelete(idImage);

    //Get Data
    const data = await ItemModel.findById(idItem).populate({
      path: "imageId",
      select: "imageUrl",
    });

    res.json(data);
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const ItemData = await ItemModel.findById(id).populate({
        path: "imageId",
        select: "id imageUrl",
      });

      //Remove itemId CategoryModel
      await CategoryModel.findByIdAndUpdate(ItemData.categoryId._id, {
        $pull: { itemId: id },
      });

      for (let index = 0; index < ItemData.imageId.length; index++) {
        const dataImage = await ImageModel.findById(
          ItemData.imageId[index]._id
        );
        if (fs.existsSync("./public/" + dataImage.imageUrl)) {
          fs.unlinkSync("./public/" + dataImage.imageUrl);
        }
        await ImageModel.findByIdAndDelete(ItemData.imageId[index]._id);
      }

      await ItemModel.findByIdAndDelete(id);

      req.flash("info", "Data berhasil dihapus");
      req.flash("status", "danger");

      res.redirect("/admin/item");
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect("/admin/item");
    }
  },
  viewAdminItemFeature: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await FeatureModel.find({ itemId: id });

      res.render("admin/item/feature/admin-feature", {
        data,
        id,
        message: req.flash("info"),
        status: req.flash("status"),
        user: req.session.user.username,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  addItemFeature: async (req, res) => {
    const { name, qty, itemId } = req.body;
    try {
      const file = req.file.filename;
      req.flash("info", "Data berhasil disimpan");
      req.flash("status", "success");

      const saveFeature = await FeatureModel.create({
        name,
        qty,
        itemId,
        imageUrl: `images/${file}`,
      });

      await ItemModel.findByIdAndUpdate(itemId, {
        $push: { featureId: saveFeature._id },
      });

      res.redirect(`/admin/item/feature/${itemId}`);
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect(`/admin/item/feature/${itemId}`);
    }
  },
  updateItemFeature: async (req, res) => {
    const { id, name, qty } = req.body;
    const dataAwal = await FeatureModel.findById(id);
    try {
      if (req.file) {
        const file = req.file.filename;
        if (fs.existsSync("./public/" + dataAwal.imageUrl)) {
          fs.unlinkSync("./public/" + dataAwal.imageUrl);
        }

        await FeatureModel.findByIdAndUpdate(id, {
          name,
          qty,
          imageUrl: `images/${file}`,
        });
      } else {
        await FeatureModel.findByIdAndUpdate(id, {
          name,
          qty,
        });
      }

      req.flash("info", "Data berhasil diupdate");
      req.flash("status", "warning");

      res.redirect(`/admin/item/feature/${dataAwal.itemId}`);
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect(`/admin/item/feature/${dataAwal.itemId}`);
    }
  },
  deleteItemFeature: async (req, res) => {
    const { id } = req.params;
    const dataAwal = await FeatureModel.findById(id).populate({
      path: "itemId",
      select: "id",
    });
    const idItem = dataAwal.itemId._id;
    try {
      if (fs.existsSync("./public/" + dataAwal.imageUrl)) {
        fs.unlinkSync("./public/" + dataAwal.imageUrl);
      }

      await ItemModel.findByIdAndUpdate(dataAwal.itemId._id, {
        $pull: {
          featureId: dataAwal._id,
        },
      });

      await FeatureModel.findByIdAndDelete(id);

      req.flash("info", "Data berhasil dihapus");
      req.flash("status", "danger");

      res.redirect(`/admin/item/feature/${idItem}`);
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect(`/admin/item/feature/${idItem}`);
    }
  },
  viewAdminItemActivity: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ActivityModel.find({ itemId: id });

      res.render("admin/item/activity/admin-activity", {
        data,
        id,
        message: req.flash("info"),
        status: req.flash("status"),
        user: req.session.user.username,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  addItemActivity: async (req, res) => {
    const { name, itemId } = req.body;
    try {
      const file = req.file.filename;
      req.flash("info", "Data berhasil disimpan");
      req.flash("status", "success");

      const saveActivity = await ActivityModel.create({
        name,
        itemId,
        imageUrl: `images/${file}`,
      });

      await ItemModel.findByIdAndUpdate(itemId, {
        $push: { activityId: saveActivity._id },
      });

      res.redirect(`/admin/item/activity/${itemId}`);
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect(`/admin/item/activity/${itemId}`);
    }
  },
  updateItemActivity: async (req, res) => {
    const { id, name } = req.body;
    const dataAwal = await ActivityModel.findById(id);
    try {
      if (req.file) {
        const file = req.file.filename;
        if (fs.existsSync("./public/" + dataAwal.imageUrl)) {
          fs.unlinkSync("./public/" + dataAwal.imageUrl);
        }

        await ActivityModel.findByIdAndUpdate(id, {
          name,
          imageUrl: `images/${file}`,
        });
      } else {
        await ActivityModel.findByIdAndUpdate(id, {
          name,
        });
      }

      req.flash("info", "Data berhasil diupdate");
      req.flash("status", "warning");

      res.redirect(`/admin/item/activity/${dataAwal.itemId}`);
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect(`/admin/item/activity/${dataAwal.itemId}`);
    }
  },
  deleteItemActivity: async (req, res) => {
    const { id } = req.params;
    const dataAwal = await ActivityModel.findById(id).populate({
      path: "itemId",
      select: "id",
    });
    const idItem = dataAwal.itemId._id;
    try {
      if (fs.existsSync("./public/" + dataAwal.imageUrl)) {
        fs.unlinkSync("./public/" + dataAwal.imageUrl);
      }

      await ItemModel.findByIdAndUpdate(dataAwal.itemId._id, {
        $pull: {
          activityId: dataAwal._id,
        },
      });

      await ActivityModel.findByIdAndDelete(id);

      req.flash("info", "Data berhasil dihapus");
      req.flash("status", "danger");

      res.redirect(`/admin/item/activity/${idItem}`);
    } catch (error) {
      req.flash("info", `${error.message}`);
      req.flash("status", "danger");

      res.redirect(`/admin/item/activity/${idItem}`);
    }
  },
  viewAdminBooking: async (req, res) => {
    try {
      const data = await BookingModel.find({})
        .populate("memberId")
        .sort({ _id: -1 });

      res.render("admin/booking/admin-booking", {
        data,
        user: req.session.user.username,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  showBooking: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await BookingModel.findById(id).populate("memberId");

      res.render("admin/booking/detail-booking", {
        message: req.flash("info"),
        status: req.flash("status"),
        data,
        user: req.session.user.username,
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
  actionBooking: async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    try {
      const data = await BookingModel.findById(id);
      data.payments.status = action;
      data.save();

      req.flash("info", "Data berhasil diupdate");
      req.flash("status", "success");

      res.redirect(`/admin/booking/${id}`);
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
};
