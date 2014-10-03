'use strict';

var http = require('http'),
  constants = require('../config/constants'),
  FeedModel = require('../models/Feeds');

exports.updateFeedInDB = function () {
  var self = this,
    apiKey = 'XqCdFFpPFgG97eL6qyTvZAJm0vjEIYSQkNEntKyMkLI7wjRCoJ',
    url = 'http://api.tumblr.com/v2/blog/burrowslaunchpad.tumblr.com/posts?api_key=' + apiKey;

  http.get(url, function (res) {
    var data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      self.addNewItemsToDB(JSON.parse(data));
    });
  });
};

exports.addNewItemsToDB = function (feedData) {
  var posts = feedData.response.posts;

  posts.forEach(function (post) {
    FeedModel.find()
      .where('id').equals(post.id)
      .where('type').equals(constants.FEED_TYPES.B_IN_THE_KNOW)
      .exec(function (err, feeds) {
        if (feeds.length < 1) {
          new FeedModel({
            id: post.id,
            url: decodeURI(post['post_url']),
            type: constants.FEED_TYPES.B_IN_THE_KNOW,
            tags: post.tags,
            title: decodeURI(post.title),
            body: decodeURI(post.body)
          }).save();
        }
      });
  });
};
