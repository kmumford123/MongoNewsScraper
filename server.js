var express = require("express");
var handlebars = require("handlebars")
var bodyParser = require("body-parser");
var exprhbs = require("express-handlebars");
var MomentHandler = require("handlebars.moment");
const hdbhelpers = require("handlebars-helpers")
var logger = require("morgan");
var routes = require("./routes")
var mongoose = require("mongoose");


// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("handlebars", exprhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
MomentHandler.registerHelpers(handlebars);

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI);

// Routes
app.use(routes);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});