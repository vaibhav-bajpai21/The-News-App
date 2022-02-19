const mongoose = require("mongoose");
const ModelProvider = require("./ModelProvider");
const Promise = require("bluebird");
let mongoDbUrl = process.env.MONGO_DB_URL;

module.exports = {
    connectDatabase() {
        return mongoose.connect(mongoDbUrl, { promiseLibrary: Promise, useNewUrlParser: true })
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