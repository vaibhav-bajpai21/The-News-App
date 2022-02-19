const FeedService = require("../services/FeedService");

function loadRoutes(app) {
    /* Api to Get all feed articles */
    app.get("/allFeeds", async (req, res) => {
        const feedServiceInst = new FeedService();
        try {
            let reqQuery = req.query;
            let response = await feedServiceInst.getAllFeedArticles(reqQuery);
            /* If API is accessed through POSTMAN, we can give Query param(response_type)
            as "JSON" to get result in Object(JSON) format */
            if (req.query && req.query.response_type === "JSON") {
                res.send(response);
                return;
            }
            /* For accessing the API through browser,
            the default output format is HTML Template rendered through EJS. */
            else {
                res.render("../views/feedArticles", {
                    res: response.data
                });
                return;
            }
        }
        catch (err) {
            res.send(err);
        }
    })

    /* Api to get all the categories of feed articles*/
    app.get("/categories", async (req, res) => {
        const feedServiceInst = new FeedService();
        try {
            let response = await feedServiceInst.getAllCategories("category");
            res.send(response);
        }
        catch (err) {
            res.send(err);
        }
    })
    /* Api to gt all the authors of feed articles */
    app.get("/authors", async (req, res) => {
        const feedServiceInst = new FeedService();
        try {
            let response = await feedServiceInst.getAllCategories("authorName");
            res.send(response);
        }
        catch (err) {
            res.send(err);
        }
    })
}

module.exports = loadRoutes;