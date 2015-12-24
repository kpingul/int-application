"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sanitizeHtml = require('sanitize-html');

var allowedTags = []; //no html input

var categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String
  },
  seoName: {
    type: String
  },
  imageUrl: {
    type: String
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  }

});

var Category = mongoose.model('Category', categorySchema);
Category.schema.pre('save', function(next) {

  if (this.imageUrl) {
    this.imageUrl = sanitizeHtml(this.imageUrl, {
      allowedTags: allowedTags
    });
  }

  next();
});

//http://docs.mongodb.org/manual/tutorial/model-tree-structures/#model-tree-structures-with-materialized-paths
