const mongoose = require("mongoose");
const ModelProvider = require("./ModelProvider");
const Promise = require("bluebird");
const config = require("../config");

module.exports = {
    connectDatabase() {
        return mongoose.connect(config.db.host, { promiseLibrary: Promise, useNewUrlParser: true })
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