var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var mongoose = require("./mongoos");
var request = require("request");
var cheerio = require("cheerio");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});
// Main route (simple Hello World Message)
app.get("", function(req, res) {
    res.send("Hello world");
});

// Route 1
// =======
app.get("/scrape", function(req, res) {
    request("https://www.cnn.com/us", function(error, response, html) {
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(html);
        // Empty array to save our scraped data
        var results = [];

        $("h3.cd__headline").each(function(i, element) {
            // Save the text of the h4-tag as "title"
            var title = $(element).text();
            // Find the h4 tag's parent a-tag, and save it's href value as "link"
            var link = $(element).children().attr("href");
            // Make an object with data we scraped for this h4 and push it to the results array
            results.push({
                title,
                link
            });
            db.scrapedData.insert({ results })
        });
        res.json(results);
    })
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});