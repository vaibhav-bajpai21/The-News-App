const express = require("express");
const feedRoutes = require('./feed.rest');
const profileRoutes = require('./profile.rest');
const adminRoutes = require('./admin.rest');

function loadRoutes(app) {
    const userRouter = express.Router({ mergeParams: true });
    const adminRouter = express.Router({ mergeParams: true });

    feedRoutes(userRouter);
    profileRoutes(userRouter);
    app.use("/user/api", userRouter);
    adminRoutes(adminRouter);
    app.use("/admin/api",adminRouter);
}

module.exports = {
    load: loadRoutes
};