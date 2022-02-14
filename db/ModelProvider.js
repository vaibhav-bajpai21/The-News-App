const fs = require("fs");
let models = {};

module.exports = {
    loadModels: (db) => {
        let schemaFiles = fs.readdirSync(__dirname + '/schemas');
        schemaFiles.forEach(file => {
            if ([".", ".."].indexOf(file) === 0)
                return;
            var schemaModule = require("./schemas/" + file)(db.Schema);
            models[schemaModule.name] = db.model(schemaModule.name, schemaModule.schema);
            console.log('loaded Model:', schemaModule.name);
        });
    },
    getModel: (modelName) => {
        if (!models[modelName])
            throw new Error("model not found with name", modelName);
        return models[modelName];
    }

}