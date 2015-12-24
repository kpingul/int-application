'use strict';
var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    mongoose = require('mongoose'),
    Client = mongoose.model('Client');

module.exports = new BasicStrategy(function(username, password, done) {
    Client.findOne({
        clientId: username
    }, function(err, client) {
        if (err) {
            return done(err);
        }
        if (!client) {
            return done(null, false);
        }
        if (client.clientSecret != password) {
            return done(null, false);
        }

        return done(null, client);
    });
});
