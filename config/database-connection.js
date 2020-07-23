const mongoose = require("mongoose"),
      f = require('util').format,
      fs = require('fs');

//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

mongoose.connect(
'mongodb://dreamifyin:i3XNQoL4u0k5@docdb-2020-07-11-10-30-49.cluster-clh4igve85fj.ca-central-1.docdb.amazonaws.com:27017/dreamify?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred', 
{ 
  sslValidate: true,
  sslCA:ca,
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