var mongoose = require("mongoose");
var Category = require("./models/Category");
var Item = require("./models/Item");
var Image = require("./models/Image");
var Feature = require("./models/Feature");
var Activity = require("./models/Activity");
var Booking = require("./models/Booking");
var Member = require("./models/Member");
var Bank = require("./models/Bank");
var Users = require("./models/Users");

// Connect to MongoDB via Mongoose
mongoose
  .connect(
    "mongodb+srv://superhalanhalan:9BxjrLWEuuB6E27O@cluster0.9q5jrp5.mongodb.net/server-halan-halan?retryWrites=true&w=majority"
  )
  .then(() => console.log("Mongoose tersambung"))
  .catch((err) => console.log(err));

var dataCategory = [
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901111"),
    name: "Houses with beauty backyard",
    itemId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902231") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902224") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902225") },
    ],
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901112"),
    name: "Hotels with large living room",
    itemId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902226") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902227") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902228") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902229") },
    ],
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901113"),
    name: "Apartment with kitchen",
    itemId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902230") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902231") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902232") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902233") },
    ],
  },
];

var dataItem = [
  // Tabby Town
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
    title: "Tabby Town",
    price: 120000,
    country: "Indonesia",
    city: "Lampung",
    isPopular: false,
    sumBooking: 2,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb1") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb2") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb3") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa09") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa10") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa11") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa12") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa13") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa14") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa15") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa16") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb05") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb06") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb07") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb08") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901111"),
  },
  // Seattle Rain
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
    title: "Seattle Rain",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    sumBooking: 5,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb4") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb5") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb6") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901111"),
  },
  // Wodden Pit
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902224"),
    title: "Wodden Pit",
    price: 20000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb7") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb8") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb9") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901111"),
  },
  // Anggana
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902225"),
    title: "Anggana",
    price: 20000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd10") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd11") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd12") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901111"),
  },
  // Green Park
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902226"),
    title: "Green Park",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd13") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd14") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd15") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901112"),
  },
  // Podo Wae
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902227"),
    title: "Podo Wae",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    sumBooking: 2,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd16") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd17") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd18") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901112"),
  },
  // Silver Rain
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902228"),
    title: "Silver Rain",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd19") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd20") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd21") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901112"),
  },
  // Cashville
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902229"),
    title: "Cashville",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd22") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd23") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd24") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901112"),
  },
  // PS Wood
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902230"),
    title: "PS Wood",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd25") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd26") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd27") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901113"),
  },
  // One Five
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902231"),
    title: "One Five",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd28") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd29") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd30") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901113"),
  },
  // Minimal
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902232"),
    title: "Minimal",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd32") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd31") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd33") },
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901113"),
  },
  // Stays Home
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902233"),
    title: "Stays Home",
    price: 200000,
    country: "Indonesia",
    city: "Bandung",
    isPopular: false,
    description:
      "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    unit: "malam",
    imageId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd36") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd34") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd35") },
      // done
    ],
    featureId: [
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07") },
      // done
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08") },
    ],
    activityId: [
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03") },
      { _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04") },
    ],
    categoryId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc901113"),
  },
];

var dataImage = [
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb1"),
    imageUrl: "images/Image 1.jfif",
  },
  // done
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb2"),
    imageUrl: "images/Image 2.jfif",
  },
  // done
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb3"),
    imageUrl: "images/Image 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb4"),
    imageUrl: "images/Image 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb5"),
    imageUrl: "images/Image 5.png",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb6"),
    imageUrl: "images/Rumah 1.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb7"),
    imageUrl: "images/Rumah 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb8"),
    imageUrl: "images/Rumah 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cdb9"),
    imageUrl: "images/Rumah 4.jfif",
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd10"),
    imageUrl: "images/Family 1.jfif",
  },
  // done
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd11"),
    imageUrl: "images/Family 2.jfif",
  },
  // done
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd12"),
    imageUrl: "images/Family 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd13"),
    imageUrl: "images/Family 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd14"),
    imageUrl: "images/Apartemen 1.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd15"),
    imageUrl: "images/Apartemen 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd16"),
    imageUrl: "images/Apartemen 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd17"),
    imageUrl: "images/Apartemen 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd18"),
    imageUrl: "images/Apartemen 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd19"),
    imageUrl: "images/Apartemen 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd20"),
    imageUrl: "images/Apartemen 1.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd21"),
    imageUrl: "images/Apartemen 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd22"),
    imageUrl: "images/Family 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd23"),
    imageUrl: "images/Family 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd24"),
    imageUrl: "images/Family 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd25"),
    imageUrl: "images/Rumah 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd26"),
    imageUrl: "images/Rumah 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd27"),
    imageUrl: "images/Rumah 1.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd28"),
    imageUrl: "images/Rumah 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd29"),
    imageUrl: "images/Image 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd30"),
    imageUrl: "images/Image 1.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd31"),
    imageUrl: "images/Image 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd32"),
    imageUrl: "images/Image 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd33"),
    imageUrl: "images/Rumah 2.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd34"),
    imageUrl: "images/Rumah 3.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd35"),
    imageUrl: "images/Rumah 4.jfif",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cd36"),
    imageUrl: "images/Rumah 1.jfif",
  },
];

var dataFeature = [
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa01"),
    name: "bathroom",
    qty: 2,
    imageUrl: "images/Icon Bathroom.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa02"),
    name: "living room",
    qty: 23,
    imageUrl: "images/Icon Living Room.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa03"),
    name: "televison",
    qty: 12,
    imageUrl: "images/Icon TV.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa04"),
    name: "televison",
    qty: 5,
    imageUrl: "images/Icon TV.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa05"),
    name: "mbp/s",
    qty: 5,
    imageUrl: "images/Icon Wifi.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa06"),
    name: "dinning room",
    qty: 5,
    imageUrl: "images/Icon Dining Room.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa07"),
    name: "refigrator",
    qty: 5,
    imageUrl: "images/Icon AC.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa08"),
    name: "televion",
    qty: 5,
    imageUrl: "images/Icon TV.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  // item 2
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa09"),
    name: "bathroom",
    qty: 2,
    imageUrl: "images/Icon Bathroom.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa10"),
    name: "living room",
    qty: 23,
    imageUrl: "images/Icon Living Room.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa11"),
    name: "televison",
    qty: 12,
    imageUrl: "images/Icon TV.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa12"),
    name: "televison",
    qty: 5,
    imageUrl: "images/Icon TV.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa13"),
    name: "mbp/s",
    qty: 5,
    imageUrl: "images/Icon Wifi.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa14"),
    name: "swimming pool",
    qty: 5,
    imageUrl: "images/Icon Swimming Pool.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa15"),
    name: "refigrator",
    qty: 5,
    imageUrl: "images/Icon AC.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    // done
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90aa16"),
    name: "televion",
    qty: 5,
    imageUrl: "images/Icon TV.png",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
];

var dataActivity = [
  // done
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb01"),
    name: "Green Lake",
    imageUrl: "images/Fitur 1.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb02"),
    name: "Dog Clubs",
    imageUrl: "images/Fitur 2.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb03"),
    name: "Labour and Wait",
    imageUrl: "images/Fitur 3.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb04"),
    name: "Labour and Wait",
    imageUrl: "images/Fitur 4.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
  },
  // done 2
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb05"),
    name: "Green Lake",
    imageUrl: "images/Fitur 3.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb06"),
    name: "Dog Clubs",
    imageUrl: "images/Fitur 2.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb07"),
    name: "Labour and Wait",
    imageUrl: "images/Fitur 1.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90bb08"),
    name: "Labour and Wait",
    imageUrl: "images/Fitur 4.jfif",
    itemId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
  },
];

var dataBooking = [
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee1"),
    bookingStartDate: "06-02-2024",
    bookingEndDate: "06-04-2024",
    invoice: "CB23KKJLM43244",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
      title: "Tabby Town",
      price: 120000,
      duration: 2,
    },
    total: 240000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BCA",
      status: "Proses",
      accountHolder: "Ricky",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee2"),
    bookingStartDate: "02-12-2024",
    bookingEndDate: "02-14-2024",
    invoice: "CB23KKJLM43245",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
      title: "Tabby Town",
      price: 120000,
      duration: 2,
    },
    total: 240000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BCA",
      status: "Proses",
      accountHolder: "Ardiansah",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee3"),
    bookingStartDate: "01-02-2024",
    bookingEndDate: "01-04-2024",
    invoice: "CB23KKJLM43246",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902223"),
      title: "Seattle Rain",
      price: 200000,
      duration: 2,
    },
    total: 400000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BCA",
      status: "Proses",
      accountHolder: "Gery",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee4"),
    bookingStartDate: "01-01-2024",
    bookingEndDate: "01-03-2024",
    invoice: "CB2K&YJLM43246",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902227"),
      title: "Podo Wae",
      price: 200000,
      duration: 2,
    },
    total: 400000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BCA",
      status: "Proses",
      accountHolder: "Woke",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee5"),
    bookingStartDate: "05-08-2024",
    bookingEndDate: "05-10-2024",
    invoice: "CB23KKJLMIH46",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902228"),
      title: "Silver Rain",
      price: 200000,
      duration: 2,
    },
    total: 400000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "Mandiri",
      status: "Proses",
      accountHolder: "Lolo",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee6"),
    bookingStartDate: "01-02-2024",
    bookingEndDate: "01-04-2024",
    invoice: "CB23KKJLM432123",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902229"),
      title: "Cashville",
      price: 200000,
      duration: 2,
    },
    total: 400000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BNI",
      status: "Proses",
      accountHolder: "Yuhu",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee7"),
    bookingStartDate: "01-11-2024",
    bookingEndDate: "01-13-2024",
    invoice: "CB23KKJLM4326643",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902229"),
      title: "Cashville",
      price: 200000,
      duration: 2,
    },
    total: 400000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BNI",
      status: "Proses",
      accountHolder: "Yuhu",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee8"),
    bookingStartDate: "02-11-2024",
    bookingEndDate: "02-13-2024",
    invoice: "CB23KKJLM4326643",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902222"),
      title: "Tabby Town",
      price: 120000,
      duration: 2,
    },
    total: 240000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "BNI",
      status: "Proses",
      accountHolder: "Yuhu",
    },
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc90cee9"),
    bookingStartDate: "02-11-2024",
    bookingEndDate: "02-13-2024",
    invoice: "CB23KKJLM4326643",
    itemId: {
      _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc902231"),
      title: "One Five",
      price: 200000,
      duration: 2,
    },
    total: 400000,
    memberId: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    payments: {
      proofPayment: "images/bukti-bayar.jpg",
      bankFrom: "Jateng",
      status: "Proses",
      accountHolder: "Dolores",
    },
  },
];

var dataMember = [
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903333"),
    firstName: "Elfin",
    lastName: "Sanjaya",
    email: "elfinsanjaya12@gmail.com",
    handphone: "082377954008",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903334"),
    firstName: "Yein",
    lastName: "Narayana",
    email: "elfinsanjaya1207@gmail.com",
    handphone: "082377954008",
  },
];

var dataBank = [
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903322"),
    nameBank: "Mandiri",
    noRekening: "089898",
    name: "elfin",
    imageUrl: "images/Logo Bank Jateng.png",
  },
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903323"),
    nameBank: "BCA",
    noRekening: "878678",
    name: "elfin",
    imageUrl: "images/Logo Bank Mandiri.png",
  },
];

var dataUsers = [
  {
    _id: new mongoose.mongo.ObjectId("5e96cbe292b97300fc903345"),
    username: "admin",
    password: "admin",
  },
];

const seeDb = async () => {
  await Category.deleteMany({});
  await Item.deleteMany({});
  await Image.deleteMany({});
  await Feature.deleteMany({});
  await Activity.deleteMany({});
  await Booking.deleteMany({});
  await Member.deleteMany({});
  await Bank.deleteMany({});
  await Users.deleteMany({});

  await Category.insertMany(dataCategory);
  await Item.insertMany(dataItem);
  await Image.insertMany(dataImage);
  await Feature.insertMany(dataFeature);
  await Activity.insertMany(dataActivity);
  await Booking.insertMany(dataBooking);
  await Member.insertMany(dataMember);
  await Bank.insertMany(dataBank);
  await Users.create(dataUsers);
};

seeDb().then(() => {
  console.log("Seeder berhasil dijalankan");
  mongoose.connection.close();
});
