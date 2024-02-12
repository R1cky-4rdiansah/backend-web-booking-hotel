const auth = async (req, res, next) => {
  const user = req.session.user;
  if (user == null || user == undefined) {
    req.flash("status", "danger");
    req.flash("info", "Maaf, Session telah habis login ulang ya...");
    res.redirect("/admin/login");
  } else {
    next();
  }
};

module.exports = auth;
