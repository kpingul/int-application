'use strict';
var passport = require('passport'),

    //strategy functions
    local = require('./auth-strategies/local'),
    basic = require('./auth-strategies/basic'),
    bearer = require('./auth-strategies/bearer'),
    clientPassword = require('./auth-strategies/clientpassword'),
    twitter = require('./auth-strategies/twitter'),
    facebook = require('./auth-strategies/facebook'),

    mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function (config) {
    passport.use(local);
    passport.use(basic);
    passport.use(bearer);
    passport.use(clientPassword);
    passport.use(twitter);
    passport.use(facebook);


    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}
