var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    Feed                    = require("./models/feed"),
    LocalStrategy           = require("passport-local").Strategy,
    passportLocalMongoose   = require("passport-local-mongoose"),
    db                      = require("./config/mlab-connection"),
    connectEnsureLogin      = require("connect-ensure-login"),
    fs                      = require('fs'),
    formidable              = require('formidable'),
    readChunk               = require('read-chunk'),
    fileType                = require('file-type'),
    path                    = require('path'),
    multer                  = require('multer'),
    helpers                 = require('./helpers/helpers');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals={
        url:req.url,
        currentUser:'',
    };
    next();
});
passport.use(new LocalStrategy({usernameField: 'email'},(User.authenticate())));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/home", connectEnsureLogin.ensureLoggedIn('/'), function(req, res){
    res.render("home/home", {currentUser: req.user});
});

app.get("/", function(req, res){
    if(req.user) {
        res.render("post/index", {currentUser: req.user});
    } else {
        res.render("home/landing");
    }
});

require("./routes")(app);
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("The Dreamify Server Has Started!");
// })

app.listen(80, function(){
  console.log("The Dreamify Server Has Started!");
}
)