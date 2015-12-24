'use strict';
var express = require('express');
var passport = require('passport');
var authService = require('../../services/auth');
var businessService = require('../../services/business');
var categoryService = require('../../services/category');
module.exports = (function() {
    var business = express.Router();

    business.get('/categories', categoryService.allCategories);
    business.get('/:name', businessService.getBusinessByName);
    business.get('/:name/messages', businessService.getMessages);

    business.post('/',
        passport.authenticate('bearer', {
            session: false
        }),
        authService.business.hasAuthorization,
        businessService.create);


    business.post('/:name',
        passport.authenticate('bearer', {
            session: false
        }),
        authService.business.hasAuthorization,
        businessService.update);

    return business;
})();
