// Route 1
// =======
module.exports = function() {

    app.get("/scrape", function(req, res) {
        request("https://www.cnn.com/specials/last-50-stories", function(error, response, html) {
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
                //loop to check for duplicates
                dbdata = db.scrapedData.find({})
                    // var dbCheck = results.each(function(i, ) {

                // })
                db.scrapedData.insert({ results })
            });
            var cnnscrape = res.json(results)
            res.render("index", {
                user: cnnscrape
            });
        })
    })
}