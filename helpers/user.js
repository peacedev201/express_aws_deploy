const User = require("../models/user");

exports.generateUniqueUserName = async (proposedName) => {
  
  var username = proposedName.replace(/@.*$/,"");
  
  return User
    .findOne({accountName: username})
    .then(function(account) {
      if (account) {
        console.log('no can do try again: ' + username);
        username += Math.floor((Math.random() * 100) + 1);
        return generateUniqueUserName(username); // <== return statement here
      }
      console.log('proposed name is unique' + username);
      return username;
    })
    .catch(function(err) {
      console.error(err);
      throw err;
    });
}