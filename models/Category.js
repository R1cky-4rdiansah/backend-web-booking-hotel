const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Eits, isi dulu nama kategorinya"],
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
