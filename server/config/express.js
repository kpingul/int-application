var express = require('express');
var session = require('express-session');
var morgan = require('morgan'); //(logger)
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var passport = require('passport');
var cache = require('../common/cache');
var logger = require('../common/logger');

module.exports = function (app, config) {
  //CORS middleware
  var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    next();
  }


  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json());
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(cache.noCache);
  app.use(allowCrossDomain);
  app.use(serveStatic('public', {
    'index': ['index.html', 'index.htm']
  }));
  app.locals.pretty = true;

};