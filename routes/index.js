var router = require("express").Router();
var productRouter = require("./apiRoutes/");
var htmlRouter = require("./htmlRoutes")

router.use("/api/products", productRouter)
module.exports = router;