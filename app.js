var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var engine = require("ejs-locals");
var dbMongoose = require("./config/database");
var methodeOverride = require("method-override");
var flash = require("connect-flash");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dashboardRouter = require("./routes/admin");
var apiRouter = require("./routes/api");
var cors = require("cors");
require("dotenv").config();

var app = express();

//server mongo db
dbMongoose.then(() => console.log("Database tersambung"));
dbMongoose.catch((err) => console.log("Database gagal tersambunng", err));

//engine-local-ejs
app.engine("ejs", engine);

//cors
app.use(
  cors({
    // origin: ["http://localhost:3001"],
    origin: ["https://backend-web-booking-hotel.vercel.app"],
    credentials: true,
  })
);

//session express
// app.set("trust proxy", 1);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "1231qweqweqwee12",
    name: "secretName",
    cookie: {
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//connect flash
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
app.use(methodeOverride("_method"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", dashboardRouter);
app.use("/api/v1", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
