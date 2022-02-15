const ModelProvider = require('../ModelProvider');
class UserModel {
    constructor() {
        this.modelName = "userCollection",
            this.getModel = () => {
                return ModelProvider.getModel(this.modelName);
            }
    }

    async saveRecord(query, record) {
        let model = this.getModel();
        let result = await model.findOneAndUpdate(query, record, { upsert: true, new:true, runValidators: true },).exec();
        return result;
    }

}

module.exports = UserModel;