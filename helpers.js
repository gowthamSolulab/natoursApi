const Handlebars = require("handlebars");
module.exports = {
  date: function (startDates) {
    const date = startDates[0].toLocaleString("en-us", {
      month: "long",
      year: "numeric",
    });
    return date;
  },
  role: function (role) {
    if (role === "lead-guide") return "Lead guide";
    return "Tour guide";
  },
  breakLines: function (text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, "<br> <br>");
    return new Handlebars.SafeString(text);
  },
  jsonStringify: function (object) {
    return JSON.stringify(object);
  },
  image1: function (images) {
    return images[0];
  },
  image2: function (images) {
    return images[1];
  },
};

// async () => {
//   hbs.registerHelper("date", function (startDates) {
//     const date = startDates[0].toLocaleString("en-us", {
//       month: "long",
//       year: "numeric",
//     });
//     return date;
//   });
//   hbs.registerHelper("partial", function (string) {
//     console.log(string.data.root.partial);
//     return `{{> ${string.data.root.partial}}}`;
//   });
//   hbs.registerHelper("path", function (string, addon) {
//     const path = `${string}${addon}`;
//     return path;
//   });

//   hbs.registerHelper("detailsHelper", function (tour) {
//     console.log(tour);
//     const path = "img/icons.svg#icon-";
//     const date = tour.startDates[0].toLocaleString("en-us", {
//       month: "long",
//       year: "numeric",
//     });
//     const details = [
//       {
//         label: "Next date",
//         text: date,
//         icon: `${path}-calendar`,
//       },
//       {
//         label: "Difficulty",
//         text: tour.difficulty,
//         icon: `${path}-trending-up`,
//       },
//       {
//         label: "Participants",
//         text: `${tour.maxGroupsize} people`,
//         icon: `${path}-user`,
//       },
//       {
//         label: "Rating",
//         text: `${tour.ratingsAverage} / 5`,
//         icon: `${path}-star`,
//       },
//     ];
//     return details;
//   });
// };
