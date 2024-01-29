const CategoryModel = require("../models/Category");
const BankModel = require("../models/Bank");
const ItemModel = require("../models/Item");
const ImageModel = require("../models/Image");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.mongo;
const fs = require("fs");

module.exports = {
  viewAdminDashboard: (req, res) => {
    res.render("admin/dashboard/admin-dashboard");
  },
  viewAdminCategory: async (req, res) => {
    try {
      const data = await CategoryModel.find({});

      res.render("admin/category/admin-category", {
        data,
        message: req.flash("info"),
        status: req.flash("status"),
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
  viewAdminBooking: async (req, res) => {
    try {
      const data = await ItemModel.find({});

      res.render("admin/booking/admin-booking", {
        data,
        message: req.flash("info"),
        status: req.flash("status"),
      });
    } catch (error) {
      res.render("error/errorPage", { message: error.message });
    }
  },
};
