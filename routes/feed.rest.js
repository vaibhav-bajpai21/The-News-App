const FeedService = require("../services/FeedService");

function loadRoutes(app) {
    app.get("/allFeeds", async (req, res) => {
        const feedServiceInst = new FeedService();
        try {
            let reqQuery = req.query;
            let response = await feedServiceInst.getAllFeedArticles(reqQuery);
            res.send(response);
        }
        catch (err) {
            res.send(err);
        }
    })
}

module.exports = loadRoutes;