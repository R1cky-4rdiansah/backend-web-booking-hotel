const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const testimonialSchema = new mongoose.Schema({
  itemId: {
    type: ObjectId,
    ref: "Item",
    required: true,
  },
  image_url: {
    type: String,
    required: String[(true, "Eits, isi gambar")],
  },
  memberId: {
    type: ObjectId,
    ref: "Member",
    required: true,
  },
  rate: {
    type: Number,
    required: [true, "Eits, nilai dulu hotelnya"],
  },
  content: {
    type: String,
    required: String[(true, "Eits, isi dulu kritik dan sarannya")],
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
