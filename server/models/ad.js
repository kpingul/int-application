//ad properties
//image
//description text
//start date?
//end date?
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sanitizeHtml = require('sanitize-html');
var allowedTags = []; //no html input

var adSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: new Date()
  },
  biz: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  }

});

var Ad = mongoose.model('Ad', adSchema);

Ad.schema.pre('save', function (next) {

  if (this.description) {
    this.description = sanitizeHtml(this.description, {
      allowedTags: allowedTags
    });
  }
  if (this.imageUrl) {
    this.imageUrl = sanitizeHtml(this.imageUrl, {
      allowedTags: allowedTags
    });
  }
  this.lastUpdated = new Date();

  next();
});

