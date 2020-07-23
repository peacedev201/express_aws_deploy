const User = require("../models/user"),
      userHelper = require("../helpers/user"),
      passport                = require("passport");
exports.register = async (req, res) => {
  
    // var Users=new User({email: req.body.email, username: await userHelper.generateUniqueUserName(req.body.email)}); 
    var Users=new User({email: req.body.email, username: req.body.username}); 
    User.register(Users, req.body.password, function(err, user) { 
        if (err) {
          res.send({success:false, message: err.message});
        } else{ 
          req.login(Users, function(err) {
            if (err) {
              console.log(err);
            }
            res.send({success:true,message:'You have registered successfully'});
          });
        } 
    });
    

};

exports.update = async (req, res) => {
    try {
      await User.findOneAndUpdate(
         { "email" : req.body.email },
         {$set: { "username" : req.body.username, "firstname":req.body.firstname, "lastname":req.body.lastname, "about":req.body.about, "phone":req.body.phone, "gender":req.body.gender, "birthday":req.body.birthday}}
      );
      res.send({success:true, message: 'You have updated the information successfully'});
    }
      catch (e){
         res.send({success:false, message: e.message});
    }
}

exports.login = async (req, res) => {

    if(!req.body.email){ 
      res.send({success: false, message: "Email was not given"}) 
    } else { 
      if(!req.body.password){ 
        res.send({success: false, message: "Password was not given"}) 
      }else{ 
        passport.authenticate(
          'local',
          function (err, user, info) {
             if(err){
               res.send({success: false, message: err}) 
             } else{ 
              if (!user) { 
                res.send({success: false, message: 'Email or Password incorrect'}) 
              } else{ 
                req.login(user, function(err){ 
                  if(err){ 
                    res.send({success: false, message: err}) 
                  }else{
                    res.send({success: true, message: 'You have logged in successfully'});
                    
                  } 
                }) 
              } 
             } 
          })(req, res); 
      }
  }

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    
    console.log(userMap);
    res.send(userMap);  
  });
};

exports.profile = (req, res) => {
  res.render("user/profile", {currentUser: req.user});
};
exports.changeAvatar = async (req, res) => {
   try {
      await User.findOneAndUpdate(
         { "email" : req.user.email },
         {$set: { "avatar" : req.body.avatar}}
      );
      res.send({success:true, message: 'You have changed your avatar successfully'});
    }
      catch (e){
         res.send({success:false, message:e.message});
    }
}
exports.change_password = async (req, res) => {
    try {
      await req.user.changePassword(req.body.current_password, req.body.password);
       res.send({success:true, message: 'You have changed your password successfully'});
    }
    catch(e){
      console.log(e);
      res.send({success:false, message: e.message})
    }
   
}