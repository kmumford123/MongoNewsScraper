var db = require ("../models");

module.exports = {
    find: function (req, res) {
        db.Product.findOne({_id: req.params.id}).then(function(dbProduct) {
            res.json(dbProduct);
        })
    },
    create: function(req, res) {
        //req.body => {name: "name", price 1.50}
        db.Product.create(req.body).then(function (dbProduct) {
            res.json(dbProduct)
        })
    }
}