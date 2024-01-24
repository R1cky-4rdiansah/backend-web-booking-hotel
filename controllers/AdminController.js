module.exports = {
  viewAdminDashboard: (req, res) => {
    res.render("admin/dashboard/admin-dashboard");
  },
  viewAdminCategory: (req, res) => {
    res.render("admin/category/admin-category");
  },
  viewAdminBank: (req, res) => {
    res.render("admin/bank/admin-bank");
  },
  viewAdminItem: (req, res) => {
    res.render("admin/item/admin-item");
  },
  viewAdminBooking: (req, res) => {
    res.render("admin/booking/admin-booking");
  },
};
