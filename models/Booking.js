const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  bookingStartDate: {
    type: Date,
    required: [true, "Eits, isi dulu tanggal mulainya"],
  },
  bookingEndDate: {
    type: Date,
    required: [true, "Eits, isi dulu tanggal selesainya"],
  },
  itemId: [
    {
      _id: {
        type: ObjectId,
        ref: "Item",
      },
      price: {
        type: Number,
        required: [true, "Eits, isi dulu harganya"],
      },
      night: {
        type: Number,
        required: [true, "Eits, isi dulu jumlah menginapnya"],
      },
    },
  ],
  bank: [
    {
      type: ObjectId,
      ref: "Bank",
    },
  ],
  memberId: [
    {
      type: ObjectId,
      ref: "Member",
    },
  ],
  proofPayment: {
    type: String,
    required: [true, "Eits, upload dulu foto pembayarannya"],
  },
  bankFrom: {
    type: Boolean,
    required: [true, "Eits, isi dulu nama banknya"],
  },
  accountHolder: {
    type: String,
    required: [true, "Eits, isi dulu nama penrasfernya"],
  },
  status: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
