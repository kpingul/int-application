"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sanitizeHtml = require('sanitize-html');

var allowedTags = []; //no html input


var contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: new Date()
  }

});

var Contact = mongoose.model('Contact', contactSchema);
Contact.schema.pre('save', function(next) {
  if (this.name) {
    this.name = sanitizeHtml(this.name, {
      allowedTags: allowedTags
    });
  }
  if (this.phone) {
    this.phone = sanitizeHtml(this.phone, {
      allowedTags: allowedTags
    });
  }


  next();
});

