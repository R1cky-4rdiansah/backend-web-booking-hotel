const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Eits, isi dulu nama bank"],
  },
  imageUrl: {
    type: String,
    required: [true, "Eits, isi dulu foto"],
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
