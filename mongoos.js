var mongoose = require("mongoose")

var theGoose = function() {
    mongoose.connect('mongodb://user:pass@localhost:port/database');

    // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
    var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

    // replica sets
    var uri = 'mongodb://user:pass@localhost:port,anotherhost:port,yetanother:port/mydatabase';
    mongoose.connect(uri);

    // with options
    mongoose.connect(uri, options);

    // optional callback that gets fired when initial connection completed
    var uri = 'mongodb://nonexistent.domain:27000';
    mongoose.connect(uri, function(error) {
        // if error is truthy, the initial connection failed.
    })

    // Set mongoose to leverage built in JavaScript ES6 Promises
    // Connect to the Mongo DB
    mongoose.Promise = Promise;
    mongoose.connect(MONGODB_URI, {
        useMongoClient: true
    });
}
module.exports = theGoose;