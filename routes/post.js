
module.exports = app => {
    const posts = require('../controllers/post'),
    connectEnsureLogin      = require("connect-ensure-login");
    var router = require("express").Router();
    router.post("/submit", posts.create);
    router.get("/getall", posts.getAll);
    router.get("/fetch", posts.fetch);
    router.get("/", posts.index);
    router.post("/uploadimage", posts.uploadImage);
    app.use('/post',connectEnsureLogin.ensureLoggedIn('/'), router);
}