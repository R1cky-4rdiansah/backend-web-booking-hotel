const mongoose = require("mongoose");

const db = mongoose.connect(
  "mongodb+srv://superhalanhalan:9BxjrLWEuuB6E27O@cluster0.9q5jrp5.mongodb.net/server-halan-halan?retryWrites=true&w=majority"
);

module.exports = db;
