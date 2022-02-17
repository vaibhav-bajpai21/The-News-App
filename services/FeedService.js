const FeedModel = require("../db/models/FeedModel");
const Promise = require("bluebird");
const _ = require("lodash");
const fs = require("fs");

class FeedService {
    constructor() {
        this.feedModelInst = new FeedModel()
    }

    async getAllFeedArticles(reqQuery) {
        try {
            let filter = {};
            let sortOptions = {};
            let skip = (reqQuery.skip && reqQuery.skip >= 0) ? reqQuery.skip : 0;
            let limit = (reqQuery.limit && reqQuery.limit >= 0) ? reqQuery.limit : 10;
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
            let feedArticles = await this.feedModelInst.findAllFeeds(filter, sortOptions, skip, limit);
            let response = [];
            _.forEach(feedArticles, (feedArticle) => {
                let object = {};
                object.headline = feedArticle.headline;
                object.category = feedArticle.category;
                object.author_name = feedArticle.authorName;
                object.thumbnail_image = feedArticle.thumbnailImage;
                response.push(object);
            });
            return Promise.resolve({
                data: response,
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

    async createArticle(requestObject, files) {
        try {
            let thumbnailObject = _.find(files, (file) => (file.fieldname === "thumbnail"));
            requestObject.thumbnailImage = thumbnailObject.filename;
            let feedArticles = await this.feedModelInst.createArticle(requestObject);
            let response = _.pick(feedArticles, ["headline", "category", "authorName", "createdAt"]);
            return Promise.resolve({
                data: response,
                status: "Success"
            });
        }
        catch (err) {
            console.log("----error in createArticle----", err);
            return Promise.reject({
                status: "Error",
                message: "DB Error"
            })
        }
    }

    async getAllCategories(fieldToBePresentInOutput) {
        try {
            let feedValues = await this.feedModelInst.findbyfields(fieldToBePresentInOutput);
            return Promise.resolve({
                data: feedValues,
                status: "Success"
            });
        }
        catch (err) {
            console.log("----error in getAllCategories----", err);
            return Promise.reject({
                status: "Error",
                message: "DB Error"
            })
        }

    }
}
module.exports = FeedService;