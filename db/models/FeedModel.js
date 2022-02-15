const ModelProvider = require('../ModelProvider');
class FeedModel {
    constructor() {
        this.modelName = "feedCollection",
            this.getModel = () => {
                return ModelProvider.getModel(this.modelName);
            }
    }

    async findAllFeeds(searchOptions, sortOptions) {
        let filter = {};
        let sort = { "createdAt": -1 };
        let model = this.getModel();
        if (searchOptions.headline) {
            filter.headline = {};
            filter.headline["$regex"] = new RegExp(`.*${searchOptions.headline}.*`, "i");
        }
        if (searchOptions.category) {
            filter.category = searchOptions.category;
        }
        if (searchOptions.authorName) {
            filter.authorName = searchOptions.authorName;
        }
        if (sortOptions.sortBy) {
            if (sortOptions.sortOrder === "asc") {
                sort = {};
                sort[sortOptions.sortBy] = 1;
            }
            else if (sortOptions.sortOrder === "desc") {
                sort = {};
                sort[sortOptions.sortBy] = -1;
            }
        }
        let result = await model.find(filter, undefined, sort).exec();
        return result;
    }
}

module.exports = FeedModel;