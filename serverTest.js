require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


// Requiring our models for syncing
var db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view



// Start the API server
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
