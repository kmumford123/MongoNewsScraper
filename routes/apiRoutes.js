var router = require("express").Router();
var newsRoomControllers = require("../controllers");

//localhost/products/
router.get("/scrapecnn", newsRoomControllers.cnnScrape);
router.get("/scrapefoxnews", newsRoomControllers.foxScrape);
router.get("/scrapemsnbc", newsRoomControllers.msnbcScrape);
router.get("/articles", newsRoomControllers.find);
router.get("/articles/:id", newsRoomControllers.findOne);
router.post("/articles/:id", newsRoomControllers.createNote);

module.exports = router;

