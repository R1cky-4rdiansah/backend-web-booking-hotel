const CategoryModel = require("../models/Category");
const BankModel = require("../models/Bank");

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
    res.redirect("/admin/bank");
  },
  deleteBank: async (req, res) => {
    res.redirect("/admin/bank");
  },
  viewAdminItem: (req, res) => {
    res.render("admin/item/admin-item");
  },
  viewAdminBooking: (req, res) => {
    res.render("admin/booking/admin-booking");
  },
};
