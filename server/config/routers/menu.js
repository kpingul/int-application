'use strict';
var express = require('express');
var passport = require('passport');
var authService = require('../../services/auth');
var menuService = require('../../services/menu');

module.exports = (function() {
  var router = express.Router();
  //Get Ad details by ad id or by business id
  router.get('/:id',
    passport.authenticate('bearer', {
      session: false
    }), menuService.findMenuById, menuService.findMenuByBiz);

  //create a new ad
  router.post('/',
    passport.authenticate('bearer', {
      session: false
    }), menuService.create);

  //update ad
  router.post('/:id',
    passport.authenticate('bearer', {
      session: false
    }), menuService.update);

  //delete ad
  router.delete('/:id',
    passport.authenticate('bearer', {
      session: false
    }), menuService.delete);

  //Add Categories
  router.post('/:id/category/',
    passport.authenticate('bearer', {
      session: false
    }), menuService.addCategory);

  //Update Categories
  router.post('/:id/category/:cid',
    passport.authenticate('bearer', {
      session: false
    }), menuService.updateCategory);

  //Add Categories
  router.delete('/:id/category/:cid',
    passport.authenticate('bearer', {
      session: false
    }), menuService.deleteCategory);


  return router;
})();
