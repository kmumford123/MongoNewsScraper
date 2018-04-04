var mongoose = rquire("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema ({
    name: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    }
});

var Product = mongoose.model("Product", productSchema);
module.exports = Product;