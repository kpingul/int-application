'use strict';
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var INVALID_CREDS = "Invalid username or password.";

module.exports = new LocalStrategy(function (username, password, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: INVALID_CREDS
            });
        }

        user.authenticate(password)
            .then(function (success) {
                if (success) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: INVALID_CREDS
                    });
                }
            });
    });
});