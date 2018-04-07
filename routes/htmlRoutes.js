var router = require("express").Router();
var exphbs = require("express-handlebars");

// router.engine("handlebars", exphbs({ defaultLayout: "main" }));
// router.set("view engine", "handlebars");

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;