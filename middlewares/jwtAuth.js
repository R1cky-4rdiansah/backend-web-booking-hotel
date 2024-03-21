const jwt = require("jsonwebtoken");

const JWTAuth = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res
      .status(401)
      .json({ message: "Maaf anda tidak diijinkan masuk situs ini" });
  }

  const token = headers.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(401).json({ message: "Token tidak valid" });
      next();
    });
  }
};

module.exports = JWTAuth;
