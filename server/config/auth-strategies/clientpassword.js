'use strict';
var passport = require('passport'),
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    mongoose = require('mongoose'),
    Client = mongoose.model('Client');

module.exports = new ClientPasswordStrategy(function(clientId, clientSecret, done) {
    Client.findOne({
        clientId: clientId
    }, function(err, client) {
        if (err) {
            return done(err);
        }
        if (!client) {
            return done(null, false);
        }
        if (client.clientSecret != clientSecret) {
            return done(null, false);
        }

        return done(null, client);
    });
});
