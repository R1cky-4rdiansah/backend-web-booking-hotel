const { ObjectId } = mongoose.Schema;
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Eits, isi dulu judul kategorinya"],
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
