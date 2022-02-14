const mongoose = require("mongoose");
const ModelProvider = require("./ModelProvider");
const Promise = require("bluebird");

module.exports = {
    connectDatabase() {
        return mongoose.connect("mongodb://localhost:27017/newsApp", { promiseLibrary: Promise, useNewUrlParser: true })
            .then((connection) => {
                console.log("Connected to MongoDB");
                ModelProvider.loadModels(mongoose);
                return connection;
            })
            .catch((err) => {
                console.log("Error in connecting to MongoDB", err);
                return;
            })
    }
}