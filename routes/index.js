const router = require("express").Router();
const newsRouter = require("./apiRoutes");
const htmlRouter = require("./htmlRoutes")
// console.log(newsRouter);


router.use("/", newsRouter)
router.use("/", htmlRouter)
module.exports = router;