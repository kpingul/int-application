'use strict';
var express = require('express');
var passport = require('passport');
var authService = require('../../services/auth');
var adService = require('../../services/ad');

module.exports = (function() {
    var router = express.Router();
    //Get Ad details by ad id or by business id
    router.get('/:id', 
        passport.authenticate('bearer', {
          session: false
        }), adService.findAdById, adService.findAdByBiz);

    //create a new ad
    router.post('/',
        passport.authenticate('bearer', {
          session: false
        }), adService.create);

     //update ad
    router.post('/:id',
        passport.authenticate('bearer', {
          session: false
        }), adService.update);
   
    //delete ad
    router.delete('/:id',
        passport.authenticate('bearer', {
            session: false
        }), adService.delete);

    return router;
})();
