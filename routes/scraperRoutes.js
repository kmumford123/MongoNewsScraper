// Route to scrape for data
// =======
var Scraperoute = function(scraper) {

    // A GET route for scraping the echoJS website
    app.get("/scrapecnn", function(req, res) {
        // First, we grab the body of the html with request
        axios.get("https://www.cnn.com/specials/last-50-stories").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
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
        });
    });

app.get("/scrapefoxnews", function(req, res) {
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
    });
});

app.get("/scrapemsnbc", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.cnn.com/specials/last-50-stories").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
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
    });
});

}

module.exports = Scraperoute;