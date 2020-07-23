const mongoose = require("mongoose");
    //   f = require('util').format,
    //   fs = require('fs');

//Specify the Amazon DocumentDB cert
//var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

mongoose.connect(
// 'mongodb+srv://test:J3NjzzijnIj2AKXB@cluster0-shard-00-02.wfyl2.mongodb.net:27017/test?retryWrites=true&w=majority', 
'mongodb+srv://test:J3NjzzijnIj2AKXB@cluster0.wfyl2.mongodb.net/test?retryWrites=true&w=majority',
{ 
  //sslValidate: true,
  //sslCA:ca,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log('Database connected');
    /*db.db.dropCollection(
        "users",
        function(err, result) {
            console.log("Collection droped");
        }
    );
    db.db.dropCollection(
        "feeds",
        function(err, result) {
            console.log("Collection droped");
        }
    );*/
    db.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log(names);
      }

      //mongoose.connection.close();
    });
    
});
module.exports = db;