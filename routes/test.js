//TEST ROUTE

module.exports = function(app){

    var router = require("express").Router();
    
    router.get("/comments", function(req, res) {
        res.render("comments");
    });
    
    router.get("/show", function(req, res){
        res.render("show");
    });

    app.use('/feed', router);
}