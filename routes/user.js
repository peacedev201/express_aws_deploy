module.exports = app => {
    const users = require('../controllers/user'),
    connectEnsureLogin      = require("connect-ensure-login");

    var router = require("express").Router();

    router.post("/register", users.register);
    router.post("/login", users.login);
    router.post("/update",connectEnsureLogin.ensureLoggedIn('/'), users.update);
    router.get("/list",connectEnsureLogin.ensureLoggedIn('/'), users.findAll);
    router.get("/profile",connectEnsureLogin.ensureLoggedIn('/'),  users.profile);
    router.post("/changeAvatar", connectEnsureLogin.ensureLoggedIn('/'), users.changeAvatar);
    router.get("/logout",connectEnsureLogin.ensureLoggedIn('/'), function(req, res){    
         req.logout();    
         res.redirect("/");
    });
    router.post("/change_password",connectEnsureLogin.ensureLoggedIn('/'),  users.change_password);
    app.use('/user', router);
}