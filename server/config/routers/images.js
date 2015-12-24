'use strict';
var express = require('express');
var passport = require('passport');
var authService = require('../../services/auth');
var imageService = require('../../services/image');

module.exports = (function (config) {
  var images = express.Router();

  //create image
  images.post('/', passport.authenticate('bearer', {
    session: false
  }), imageService.upload);

  return images;
})();