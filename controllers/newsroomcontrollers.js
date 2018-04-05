var db = require ("../models");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
    find: function (req, res) {
         // Find all Articles
    db.Article.find({}).sort({ _id:-1 })
        .then(function(dbArticle) {
            // If all Articles are successfully found, send them back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send the error back to the client
            res.json(err);
        });
    },
    createNote: function(req, res) {
        // save the new note that gets posted to the Notes collection
       db.Note.create(req.body)
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id })
                .populate("note")
                .then(function(dbArticle) {
                    res.json(dbArticle)
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });
        });
    },
    findOne: function (req, res) {
        db.Article.findOne({ _id: req.params.id })
        // Specify that we want to populate the retrieved libraries with any associated notes
        .populate("note")
        .then(function(dbArticle) {
            // If any Articles are found, send them to the client with any associated notes
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
    },
    cnnScrape:  function (req, res) {
        // Grab the body of the html with request
    axios.get("https://www.cnn.com/specials/last-50-stories").then(function(response) {
        // Load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("h3.cd__headline").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
        window.alert("You have successfully scraped CNN articles, redirecting to your results!!!");
        window.location.href = "#scrapelocale";
    });
    },
    foxScrape:  function (req, res) {
// First, we grab the body of the html with request
    axios.get("http://www.foxnews.com/world.html").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("header.info-header").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("h2.title")
                .text();
            result.link = $(this)
                .children("h2.title")
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
        window.alert("You have successfully scraped FoxNews articles, redirecting to your results!!!");
        window.location.href = "#scrapelocale";
    });
    },
    msnbcScrape: function (req, res) {
        // First, we grab the body of the html with request
    axios.get("http://www.msnbc.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("header.info-header").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("h2.title")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
        window.alert("You have successfully scraped MSNBC articles, redirecting to your results!!!");
        window.location.href = "#scrapelocale";
            });
        });
    }

};