const router = require("express").Router();
const newsRouter = require("./apiRoutes");
const htmlRouter = require("./htmlRoutes")

router.use("/", newsRouter)
module.exports = router;