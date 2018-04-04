var router = router("express").Router();
var productController = require("../controllers/productControllers");

router.get("/:id", productController.find);
router.post("/new", productController.create);

module.exports = router;

