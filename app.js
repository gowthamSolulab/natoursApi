const path = require("path");
const express = require("express");
const morgan = require("morgan"); // http request logs
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const handlebars = require("express-handlebars"); // version 5.2.0 and below works

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRouter");
const {
  date,
  breakLines,
  jsonStringify,
  role,
  image1,
  image2,
} = require("./helpers");

const app = express();

app.set("view engine", "hbs");
//instead of app.engine('handlebars', handlebars({
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    //new configuration parameter
    extname: "hbs",
    helpers: {
      date,
      breakLines,
      role,
      jsonStringify,
      image1,
      image2,
    },
  })
);
app.set("views", path.join(__dirname, "views"));

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
// hbs.registerPartials(__dirname + "/views/partials", function (err) {});
// hbs.registerLayouts();
// hbsHelpers();

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

//  Global  Middlewares

// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests for API
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: "Too many  requests from this IP , Please try again in an hour",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// Data Sanitization against NoSQl query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "price",
      "maxGroupSize",
      "difficulty",
    ],
  })
);

//  Routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
