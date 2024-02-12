const mongoose = require("mongoose");
const ItemModel = require("../models/Item");
const BankModel = require("../models/Bank");
const MemberModel = require("../models/Member");
const ActivityModel = require("../models/Activity");
const CategoryModel = require("../models/Category");
const BookingModel = require("../models/Booking");
const objectId = mongoose.mongo.ObjectId;

module.exports = {
  landingPage: async (req, res) => {
    try {
      const traveler = await MemberModel.find({}).count();
      const kota = await ItemModel.find({}).count();
      const keajaiban = await ActivityModel.find({}).count();

      const hero = {
        traveler,
        kota,
        keajaiban,
      };

      const mostPicked = await ItemModel.aggregate([
        {
          $lookup: {
            from: "images",
            localField: "imageId",
            foreignField: "_id",
            as: "image_url",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  image_url: "$imageUrl",
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            name: "$title",
            country: 1,
            city: 1,
            price: 1,
            sumBooking: 1,
            imageUrl: { $arrayElemAt: ["$image_url", 0] },
            unit: 1,
          },
        },
        {
          $sort: {
            sumBooking: -1,
          },
        },
        {
          $limit: 5,
        },
      ]);

      const endCategory = [];

      mostPicked.forEach((val, i) => {
        const data = mostPicked[i];

        const nestedOutside = (data) => {
          const newData = Object.assign({}, data, data.imageUrl);
          delete newData.imageUrl;

          return newData;
        };

        const newData = nestedOutside(data);
        endCategory.push(newData);
      });

      const category = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "items",
            localField: "itemId",
            foreignField: "_id",
            as: "items",
            pipeline: [
              { $sort: { sumBooking: -1 } },
              { $limit: 8 },
              {
                $project: {
                  _id: 1,
                  name: "$title",
                  price: 1,
                  country: 1,
                  city: 1,
                  isPopular: 1,
                  unit: 1,
                  sumBooking: 1,
                  imageId: { $arrayElemAt: ["$imageId", 0] },
                },
              },
              {
                $lookup: {
                  from: "images",
                  localField: "imageId",
                  foreignField: "_id",
                  as: "image_url",
                  pipeline: [
                    {
                      $project: {
                        _id: 0,
                        imageUrl: 1,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            "items._id": 1,
            "items.name": 1,
            "items.price": 1,
            "items.country": 1,
            "items.city": 1,
            "items.isPopular": 1,
            "items.unit": 1,
            "items.sumBooking": 1,
            "items.image": { $arrayElemAt: ["$items.image_url", 0] },
          },
        },
      ]);

      for (let i = 0; i < category.length; i++) {
        for (let x = 0; x < category[i].items.length; x++) {
          const item = await ItemModel.findById(category[i].items[x]._id);
          if (x == 0 && item.sumBooking !== 0) {
            item.isPopular = true;
            await item.save();
            category[i].items[x].isPopular = true;
          } else {
            item.isPopular = false;
            await item.save();
          }
        }
      }

      const testimonial = {
        _id: "0iesdad8g43r34r34rh8edff29",
        image_url: "/images/Testimonial.jpg",
        name: "Happy Family",
        rate: 4.375,
        content:
          "Liburan yang sangat luar biasa dengan pemandangan yang memukau dan dan sangat natural. Kami sangat menikmati tempat disini dengan keyanaman yang sangat luar biasa.",
        nameFamily: "Ricky Ardiansah",
        familyJobs: "Full-Stack Web & Mobile Developer",
      };

      res.json({ hero, mostPicked: endCategory, category, testimonial }, 200);
    } catch (error) {
      res.json(error.message);
    }
  },
  detailPage: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await ItemModel.aggregate([
        {
          $match: { _id: new objectId(id) },
        },
        {
          $lookup: {
            from: "images",
            localField: "imageId",
            foreignField: "_id",
            as: "image",
            pipeline: [
              {
                $project: { _id: 1, url: "$imageUrl" },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "features",
            localField: "featureId",
            foreignField: "_id",
            as: "feature",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  qty: 1,
                  name_icon: "$name",
                  url_icon: "$imageUrl",
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "activities",
            localField: "activityId",
            foreignField: "_id",
            as: "activity",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  image_url: "$imageUrl",
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            name: "$title",
            price: 1,
            country: 1,
            city: 1,
            isPopular: 1,
            description: 1,
            unit: 1,
            sumBooking: 1,
            image_url: "$image",
            feature: "$feature",
            doing: "$activity",
          },
        },
      ]);

      const bank = await BankModel.find({}).select("");

      const testimonial = {
        _id: "0iesdad8g43r34r34rh8edff29",
        image_url: "/assets/image/Testimonial.jpg",
        name: "Happy Family",
        rate: 4.375,
        content:
          "Liburan yang sangat luar biasa dengan pemandangan yang memukau dan dan sangat natural. Kami sangat menikmati tempat disini dengan keyanaman yang sangat luar biasa.",
        nameFamily: "Ricky Ardiansah",
        familyJobs: "Full-Stack Web & Mobile Developer",
      };

      res.json({ ...data[0], bank, testimonial }, 200);
    } catch (error) {
      res.json(error.message);
    }
  },
  bookingPage: async (req, res) => {
    try {
      const {
        idItem,
        duration,
        price,
        bookingStartDate,
        bookingEndDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        accountHolder,
        bankFrom,
      } = req.body;

      if (!req.file) {
        return res.status(404).json({ message: "Gambar tidak ditemukan" });
      }

      if (
        (idItem &&
          duration &&
          price &&
          bookingStartDate &&
          bookingEndDate &&
          firstName &&
          lastName &&
          email &&
          phoneNumber &&
          accountHolder &&
          bankFrom) === undefined ||
        (idItem &&
          duration &&
          price &&
          bookingStartDate &&
          bookingEndDate &&
          firstName &&
          lastName &&
          email &&
          phoneNumber &&
          accountHolder &&
          bankFrom) === ""
      ) {
        return res.status(404).json({ message: "Lengkapi semua data" });
      }

      const item = await ItemModel.findById(idItem);

      if (!item) {
        return res.json({ message: "Data tidak dapat ditemukan" });
      }

      item.sumBooking += 1;
      item.save();

      const tax = 0.1;
      const subTotal = price * duration;
      const total = subTotal + subTotal * tax;

      const date = new Date();
      const day = `0${date.getDate()}`.slice(-2);
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const year = `${date.getFullYear()}`.slice(-2);

      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      let randomChar = "";
      const charactersLength = characters.length;
      for (let i = 0; i < 8; i++) {
        randomChar += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      const invoice = `HH${year}${month}${day}${randomChar}`;

      const member = await MemberModel.create({
        firstName,
        lastName,
        email,
        handphone: phoneNumber,
      });

      await BookingModel.create({
        bookingStartDate,
        bookingEndDate,
        invoice,
        itemId: {
          _id: idItem,
          title: item.title,
          price: item.price,
          duration,
        },
        total,
        memberId: member._id,
        payments: {
          proofPayment: `images/${req.file.filename}`,
          bankFrom,
          accountHolder,
        },
      });

      res.json({
        message: "Pesanan berhasil",
      });
    } catch (error) {
      res.json(error.message);
    }
  },
};
