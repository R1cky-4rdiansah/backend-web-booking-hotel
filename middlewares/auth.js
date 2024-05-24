const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // const user = req.session.user;
  // if (user == null || user == undefined) {
  //   req.flash("status", "danger");
  //   req.flash("info", "Maaf, Session telah habis login ulang ya...");
  //   res.redirect("/admin/login");
  // } else {
  //   next();
  // }

  const token = req.cookies.token;

  if (!token) {
    res.redirect("/admin/login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      req.flash("status", "danger");
      req.flash("info", "Maaf, Token telah habis login ulang ya...");
      res.redirect("/admin/login");
    }
    console.log(decode);
    next();
  });
};

module.exports = auth;
