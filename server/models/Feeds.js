'use strict';

var model,
  mongoose = require('mongoose'),
  constants = require('../config/constants'),
  modelName = constants.MODEL.FEED;

function getSchema() {
  return {
    id: Number,
    url: String,
    type: String,
    tags: [String],
    title: String,
    body: String

  };
}

function filterByFeedType(query, type) {
    if (type) {
        query.where('type').equals(type);
    }
}

function limitFeedItems(query, limit) {
    if (limit) {
        query.limit(limit);
    }
}

function getFeed(callback, type, limit) {
    var query = model.find();

    filterByFeedType(query, type);
    limitFeedItems(query, limit);

    query.exec(callback);
}

function initModel() {
  var Schema = mongoose.Schema,
    modelSchema = new Schema(getSchema());

    modelSchema.statics.getFeed = getFeed;

  model = mongoose.model(modelName, modelSchema);
}

module.exports = (function () {
  if (!model) {
    initModel();
  }
  return model;
})();
