const mongoose = require("mongoose");
const ItemModel = require("../models/Item");
const BankModel = require("../models/Bank");
const MemberModel = require("../models/Member");
const ActivityModel = require("../models/Activity");
const CategoryModel = require("../models/Category");
const BookingModel = require("../models/Booking");
const objectId = mongoose.mongo.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TestimonialModel = require("../models/Testimonial");
const fs = require("fs");

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

      const finalMostPiked = [];

      mostPicked.forEach((val, i) => {
        const data = mostPicked[i];

        const nestedOutside = (data) => {
          const newData = Object.assign({}, data, data.imageUrl);
          delete newData.imageUrl;

          return newData;
        };

        const newData = nestedOutside(data);
        finalMostPiked.push(newData);
      });

      // const category = await CategoryModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "items",
      //       localField: "itemId",
      //       foreignField: "_id",
      //       as: "items",
      //       pipeline: [
      //         { $sort: { sumBooking: -1 } },
      //         { $limit: 8 },
      //         {
      //           $project: {
      //             _id: 1,
      //             name: "$title",
      //             price: 1,
      //             country: 1,
      //             city: 1,
      //             isPopular: 1,
      //             unit: 1,
      //             sumBooking: 1,
      //             imageId: 1,
      //           },
      //         },
      //         {
      //           $lookup: {
      //             from: "images",
      //             localField: "items.imageId",
      //             foreignField: "_id",
      //             as: "image_url",
      //             pipeline: [
      //               {
      //                 $project: {
      //                   _id: 0,
      //                   imageUrl: 1,
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 1,
      //       name: 1,
      //       "items._id": 1,
      //       "items.name": 1,
      //       "items.price": 1,
      //       "items.country": 1,
      //       "items.city": 1,
      //       "items.isPopular": 1,
      //       "items.unit": 1,
      //       "items.sumBooking": 1,
      //       "items.image": "$items.image_url.imageUrl",
      //     },
      //   },
      // ]);

      var category = await CategoryModel.find({})
        .select("_id name")
        .populate({
          path: "itemId",
          select: "_id title country city price sumBooking isPopular",
          perDocumentLimit: 8,
          populate: {
            path: "imageId",
            select: "imageUrl",
            perDocumentLimit: 1,
          },
        });

      var idItemPopular = [];
      for (let i = 0; i < category.length; i++) {
        var maxId = "";
        for (let x = 0; x < category[i].itemId.length; x++) {
          const item = await ItemModel.findById(category[i].itemId[x]._id);
          item.isPopular = false;
          await item.save();
          var valueItem = 0;
          if (item.sumBooking > valueItem) {
            valueItem = item.sumBooking;
            maxId = item._id;
          }
        }
        if (maxId !== "") {
          idItemPopular.push(maxId);
        }
      }

      for (let index = 0; index < idItemPopular.length; index++) {
        await ItemModel.findByIdAndUpdate(idItemPopular[index], {
          isPopular: true,
        });
      }

      category = await CategoryModel.find({})
        .select("_id name")
        .populate({
          path: "itemId",
          select: "_id title country city price sumBooking isPopular",
          perDocumentLimit: 8,
          populate: {
            path: "imageId",
            select: "imageUrl",
            perDocumentLimit: 1,
          },
        });

      const testimonial = await TestimonialModel.aggregate([
        {
          $lookup: {
            from: "members",
            localField: "memberId",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  name: { $concat: ["$firstName", " ", "$lastName"] },
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            image_url: 1,
            name: { $first: "$user.name" },
            rate: 1,
            content: 1,
          },
        },
        {
          $match: { rate: { $gt: 4 } },
        },
      ]);

      return res.json(
        {
          hero,
          mostPicked: finalMostPiked,
          category,
          testimonial: testimonial[0],
        },
        200
      );
    } catch (error) {
      return res.json(error.message);
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

      // const testimonial = {
      //   _id: "0iesdad8g43r34r34rh8edff29",
      //   image_url: "images/Testimonial.jpg",
      //   name: "Happy Family",
      //   rate: 4.375,
      //   content:
      //     "Liburan yang sangat luar biasa dengan pemandangan yang memukau dan dan sangat natural. Kami sangat menikmati tempat disini dengan keyanaman yang sangat luar biasa.",
      //   nameFamily: "Ricky Ardiansah",
      //   familyJobs: "Full-Stack Web & Mobile Developer",
      // };

      const testimonial = await TestimonialModel.aggregate([
        {
          $match: { itemId: new objectId(id) },
        },
        {
          $lookup: {
            from: "members",
            localField: "memberId",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  name: { $concat: ["$firstName", " ", "$lastName"] },
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            image_url: 1,
            name: { $first: "$user.name" },
            rate: 1,
            content: 1,
          },
        },
      ]);

      return res.json({ ...data[0], bank, testimonial: testimonial[0] }, 200);
    } catch (error) {
      return res.json(error.message);
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
      const { userId } = req.user;

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

      const member = await MemberModel.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        email,
        handphone: phoneNumber,
      });

      const booking = await BookingModel.create({
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

      return res.json({
        message: "Pesanan berhasil",
        data: booking,
      });
    } catch (error) {
      return res.json(error.message);
    }
  },
  orderDetails: async (req, res) => {
    const { invoice } = req.params;

    const data = await BookingModel.findOne({ invoice })
      .populate({
        path: "itemId._id",
        populate: {
          path: "featureId imageId",
        },
      })
      .populate({ path: "memberId" });

    return res.json({ data });
  },
  findPage: async (req, res) => {
    const { page, nama, harga, kota, search } = req.query;
    const skip = 9 * page;
    var filter = { isPopular: -1 };
    if (nama !== "" && nama !== undefined) {
      if (nama == "Ascending") {
        filter.title = 1;
      } else {
        filter.title = -1;
      }
    }

    if (harga !== "" && harga !== undefined) {
      if (harga == "Termurah") {
        filter.price = 1;
      } else {
        filter.price = -1;
      }
    }

    var filterSearch = {};

    if (search !== "" && search !== undefined) {
      filterSearch.title = {
        $regex: new RegExp(search, "i"),
      };
    }

    if (kota !== "" && kota !== undefined) {
      filterSearch.city = {
        $regex: new RegExp(kota, "i"),
      };
    }

    try {
      const data = await ItemModel.find(filterSearch)
        .select("_id title country city price sumBooking isPopular")
        .populate({
          path: "imageId",
          select: "imageUrl",
          perDocumentLimit: 1,
        })
        .sort(filter)
        .skip(skip)
        .limit(9);

      const city = await ItemModel.aggregate([
        {
          $group: {
            _id: "$city",
          },
        },
      ]);

      return res.json({ data, city });
    } catch (error) {
      return res.json(error.message);
    }
  },
  storiePage: async (req, res) => {
    const { userId } = req.user;
    const data = await BookingModel.aggregate([
      { $match: { memberId: new objectId(userId) } },
      {
        $lookup: {
          from: "items",
          localField: "itemId._id",
          foreignField: "_id",
          as: "item",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                country: 1,
                city: 1,
                imageId: { $first: "$imageId" },
              },
            },
            {
              $lookup: {
                from: "images",
                localField: "imageId",
                foreignField: "_id",
                as: "image",
                pipeline: [
                  {
                    $project: {
                      _id: 0,
                      url: "$imageUrl",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "testimonials",
          localField: "itemId._id",
          foreignField: "itemId",
          as: "testi",
          pipeline: [
            {
              $project: {
                _id: 0,
                rate: 1,
              },
            },
            {
              $group: {
                _id: "itemId",
                count: { $sum: 1 },
                average: { $avg: "$rate" },
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            itemId: "$itemId._id",
            title: { $first: "$item.title" },
            country: { $first: "$item.country" },
            city: { $first: "$item.city" },
            imageId: { $first: "$item.image.url" },
            price: "$itemId.price",
            duration: "$itemId.duration",
            count: { $first: "$testi.count" },
            average: { $first: "$testi.average" },
            memberId: "$memberId",
          },
          bookingStartDate: { $first: "$bookingStartDate" },
          bookingEndDate: { $first: "$bookingEndDate" },
        },
      },
      { $sort: { bookingStartDate: -1 } },
    ]);

    return res.json({ data });
  },
  myStorie: async (req, res) => {
    try {
      const { itemId } = req.body;
      const { userId } = req.user;
      const data = await TestimonialModel.findOne({ itemId, memberId: userId });

      return res.json({ data });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  sendRate: async (req, res) => {
    try {
      const { methode, nilai, testimonial, itemId, testiId } = req.body;
      const { userId } = req.user;
      if (methode == "post") {
        await TestimonialModel.create({
          content: testimonial,
          image_url: `images/${req.file.filename}`,
          memberId: userId,
          itemId: itemId,
          rate: nilai,
        });
      } else if (methode == "update") {
        if (req.file) {
          const data = await TestimonialModel.findById(testiId);
          //Delete Gambar
          if (fs.existsSync("./public/" + data.image_url)) {
            fs.unlinkSync("./public/" + data.image_url);
          }
          await TestimonialModel.findByIdAndUpdate(testiId, {
            content: testimonial,
            image_url: `images/${req.file.filename}`,
            memberId: userId,
            itemId: itemId,
            rate: nilai,
          });
        } else {
          await TestimonialModel.findByIdAndUpdate(testiId, {
            content: testimonial,
            memberId: userId,
            itemId: itemId,
            rate: nilai,
          });
        }
      }
      return res.json({ message: "Data sudah tersimpan" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  myProfile: async (req, res) => {
    const { userId } = req.user;

    const data = await MemberModel.findById(userId);

    return res.status(200).json({ data });
  },
  loginApi: async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await MemberModel.findOne({ username });

      if (!existingUser) {
        return res.status(400).json({ message: "Akun tidak ditemukan" });
      }

      const validation = await bcrypt.compare(password, existingUser.password);

      if (!validation) {
        return res.status(400).json({ message: "Password salah" });
      }

      const token = jwt.sign(
        { userId: existingUser._id, username: existingUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ token });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  registerApi: async (req, res) => {
    try {
      const { username, password, email } = await req.body;

      const existingUser = await MemberModel.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: "Username sudah ada" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = new MemberModel({
        username,
        password: hashedPass,
        email,
      });

      await newUser.save();

      return res.json({ message: "Akun berhasil dibuat" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
