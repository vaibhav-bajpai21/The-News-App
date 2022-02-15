const FeedModel = require("../db/models/FeedModel");
const Promise = require("bluebird");
class FeedService {
    constructor() {
        this.feedModelInst = new FeedModel()
    }

    async getAllFeedArticles(reqQuery) {
        try {
            let filter = {};
            let sortOptions = {};
            if (reqQuery.headline) {
                filter.headline = reqQuery.headline;
            }
            if (reqQuery.category) {
                filter.category = reqQuery.category;
            }
            if (reqQuery.author_name) {
                filter.authorName = reqQuery.author_name;
            }

            if (reqQuery.sort_by) {
                sortOptions.sortBy = reqQuery.sort_by || "createdAt";
                sortOptions.sortOrder = reqQuery.sort_order || "desc";
            }
            let feedArticles = await this.feedModelInst.findAllFeeds(filter, sortOptions);
            return Promise.resolve({
                data: feedArticles,
                status: "Success"
            });
        }
        catch (err) {
            console.log("----error in getAllFeedArticles----", err);
            return Promise.reject({
                status: "Error",
                message: "DB Error"
            })
        }
    }
}
module.exports = FeedService;