const express = require("express");
const feedRoutes = require('./feed.rest');
const profileRoutes = require('./profile.rest');

function loadRoutes(app) {
    const userRouter = express.Router({ mergeParams: true });
    
    feedRoutes(userRouter);
    profileRoutes(userRouter);
    app.use("/user/api", userRouter);
}

module.exports = {
    load: loadRoutes
};