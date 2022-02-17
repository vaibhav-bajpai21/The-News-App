const FeedService = require("../services/FeedService");

function loadRoutes(app) {
    /* Api to Get all feed articles */
    app.get("/allFeeds", async (req, res) => {
        const feedServiceInst = new FeedService();
        try {
            let reqQuery = req.query;
            let response = await feedServiceInst.getAllFeedArticles(reqQuery);
            console.log(response.data);
            res.render("../views/feedArticles", {
                res: response.data
            });
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
    app.get("/author_name", async (req, res) => {
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