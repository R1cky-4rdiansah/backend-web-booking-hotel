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
  invoice: {
    type: String,
    required: true,
  },
  itemId: {
    _id: {
      type: ObjectId,
      ref: "Item",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  total: {
    type: Number,
    required: true,
  },
  memberId: {
    _id: {
      type: ObjectId,
      ref: "Member",
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "Mohon isi nama depan"],
    },
    lastName: {
      type: String,
      required: [true, "Mohon isi nama belakang"],
    },
  },
  payments: {
    proofPayment: {
      type: String,
      required: [true, "Eits, upload dulu foto pembayarannya"],
    },
    bankFrom: {
      type: String,
      required: String[(true, "Eits, isi dulu nama banknya")],
    },
    accountHolder: {
      type: String,
      required: [true, "Eits, isi dulu nama penrasfernya"],
    },
    status: {
      type: String,
      default: "Proses",
    },
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
