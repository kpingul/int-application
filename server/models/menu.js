//what is included in a menu? prices? this only applies to dispensaries right? prices per weight?
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var allowedTags = []; //no html input
var Category = new Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  items: [{}]
});

var menuSchema = new Schema({
  categories: [Category],
  biz: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  }

});

var Menu = mongoose.model('Menu', menuSchema);
