const User = require("../models/userModel");
const Tour = require("../models/tourModel");

exports.getOverview = async (req, res, next) => {
  const tours = await Tour.find().lean();
  tours.forEach((tour) => {
    tour.imageCover = `img/tours/${tour.imageCover}`;
  });

  // Render the data

  res.status(200).render("overview", {
    layout: "index",
    tours,
    title: "Exciting tours for adventurous people",
  });
};

exports.getTour = async (req, res) => {
  const tour = await Tour.findOne({ slug: req.query.tour })
    .populate({
      path: "reviews",
      fields: "review rating user",
    })
    .lean(); // mongoose object model to json model use lean
  const date = tour.startDates[0].toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
  const details = [
    {
      label: "Next date",
      text: date,
      icon: `calendar`,
    },
    {
      label: "Difficulty",
      text: tour.difficulty,
      icon: `trending-up`,
    },
    {
      label: "Participants",
      text: `${tour.maxGroupSize} people`,
      icon: `user`,
    },
    {
      label: "Rating",
      text: `${tour.ratingsAverage} / 5`,
      icon: `star`,
    },
  ];
  tour.details = details;
  res.status(200).render("tour", { layout: "main", tour, title: tour.name });
};

// exports.getLogin = (req, res, next) => {
//   // Render the data

//   res.status(200).render("login", {
//     title: "Login",
//   });
// };
