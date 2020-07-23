const Feed = require("../models/feed"),
      User = require("../models/user"),
      moment = require('moment');

exports.create = async (req, res) => {
    const feed = req.body.feed;
    const user = req.user;
    Feed.create({ feed_content: feed, user: user }, function (err, feedData) {
      if (err) {
        res.send(err);
      } else {
        let feed_array = [];
        feed_array.push( { _id : feedData._id  , data : feedData , extra: { time_ago :  moment(feedData.updatedAt).fromNow() }});
        res.send(feed_array);
      }
    });

};

// Retrieve all Feeds from the database.
exports.getAll = async (req, res) => {
  const options = {
    page: 1,
    limit: 10,
    sort: {updatedAt: -1},
    populate : 'user'
  };
   
  Feed.paginate({}, options, function(err, feeds) {
    if(err) console.log(err);
    else {
      let docs = [];
      let feed_array = [];
      feeds.docs.forEach(function (item, index) {
        docs.push( { item : item , extra: { time_ago :  moment(item.updatedAt).fromNow() }});
      });
      feed_array.push({
        docs: docs,
        totalDocs: feeds.totalDocs,
        limit: feeds.limit,
        page: feeds.page,
        totalPages: feeds.totalPages,
        hasNextPage: feeds.hasNextPage,
        nextPage: feeds.nextPage,
        hasPrevPage: feeds.hasPrevPage,
        prevPage: feeds.prevPage,
        pagingCounter: feeds.pagingCounter
      });
      res.send(feed_array[0]);
    }
  });
};

// Retrieve all Feeds from the database.
exports.fetch = async (req, res) => {
  Feed.find( {} , null , { populate : 'user' } , function (err, feeds) {
    if(err) {
      console.log(err);
    }
    let feed_array = [];
    feeds.forEach(function (item, index) {
      feed_array.push( { _id : item._id  , data : item , extra: { time_ago :  moment(item.updatedAt).fromNow() }});
    });
    res.send(feed_array);
  });
};