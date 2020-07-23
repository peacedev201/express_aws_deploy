module.exports = app => {
    const feeds = require('../controllers/feed'),
    connectEnsureLogin      = require("connect-ensure-login");
    var router = require("express").Router();

    router.post("/submit", feeds.create);
    router.get("/getall", feeds.getAll);
    router.get("/fetch", feeds.fetch);
    app.use('/feed',connectEnsureLogin.ensureLoggedIn('/'), router);
}