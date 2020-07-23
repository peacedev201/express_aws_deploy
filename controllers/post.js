const Post = require("../models/post"),
      User = require("../models/user"),
      moment = require('moment');
var upload_image=require("../helpers/upload_image");

exports.index = (req, res) => {
  res.render("post/index", {currentUser: req.user});
};
exports.create = async (req, res) => {
    const post = req.body.post;
    const user = req.user;
    Post.create({ post_content: post, user: user }, function (err, postData) {
      if (err) {
        res.send(err);
      } else {
        let post_array = [];
        post_array.push( { _id : postData._id  , data : postData , extra: { time_ago :  moment(postData.updatedAt).fromNow() }});
        res.send(post_array);
      }
    });

};

// Retrieve all Posts from the database.
exports.getAll = async (req, res) => {
  const options = {
    page: 1,
    limit: 5,
    sort: {updatedAt: -1},
    populate : 'user'
  };
   
  Post.paginate({}, options, function(err, posts) {
    if(err) console.log(err);
    else {
      let docs = [];
      let post_array = [];
      posts.docs.forEach(function (item, index) {
        docs.push( { item : item , extra: { time_ago :  moment(item.updatedAt).fromNow() }});
      });
      post_array.push({
        docs: docs,
        totalDocs: posts.totalDocs,
        limit: posts.limit,
        page: posts.page,
        totalPages: posts.totalPages,
        hasNextPage: posts.hasNextPage,
        nextPage: posts.nextPage,
        hasPrevPage: posts.hasPrevPage,
        prevPage: posts.prevPage,
        pagingCounter: posts.pagingCounter
      });
      res.send(post_array[0]);
    }
  });
};

// Retrieve all posts from the database.
exports.fetch = async (req, res) => {
  Post.find( {} , null , { populate : 'user' } , function (err, posts) {
    if(err) {
      console.log(err);
    }
    let post_array = [];
    posts.forEach(function (item, index) {
      post_array.push( { _id : item._id  , data : item , extra: { time_ago :  moment(item.updatedAt).fromNow() }});
    });
    res.send(post_array);
  });
};
//upload image
exports.uploadImage = async (req, res) => {
  upload_image(req, function(err, data){
    if(err){
      return res.status(404).end(JSON.stringify(err));
    }
    res.send(data);
  })
}