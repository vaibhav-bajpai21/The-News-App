const ModelProvider = require('../ModelProvider');
class FeedModel {
    constructor() {
        this.modelName = "feedCollection",
            this.getModel = () => {
                return ModelProvider.getModel(this.modelName);
            }
    }

    async findAllFeeds(searchOptions, sortOptions, skip, limit) {
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
            if (sortOptions.sortBy === "author_name")
                sortOptions.sortBy = "authorName";
            if (sortOptions.sortBy === "created_at")
                sortOptions.sortBy = "createdAt";
            if (sortOptions.sortOrder === "asc") {
                sort = {};
                sort[sortOptions.sortBy] = 1;
            }
            else if (sortOptions.sortOrder === "desc") {
                sort = {};
                sort[sortOptions.sortBy] = -1;
            }
        }
        console.log(skip,limit)
        let result = await model.find(filter, undefined).sort(sort).skip(skip).limit(limit).exec();
        return result;
    }

    async createArticle(record) {
        let model = this.getModel();
        let result = await model.create(record);
        return result;
    }

    async findbyfields(fieldsToBeReturned) {
        let model = this.getModel();
        let result = await model.find({}, fieldsToBeReturned).exec();
        return result;
    }
}

module.exports = FeedModel;