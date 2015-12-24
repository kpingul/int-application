'use strict';
var express = require('express');
var passport = require('passport');
var authService = require('../../services/auth');
var messageService = require('../../services/message');

module.exports = (function() {
    var messages = express.Router();
    messages.get('/', passport.authenticate('bearer', {
        session: false
    }), messageService.all);

    //send message
    messages.post('/',
        passport.authenticate('bearer', {
            session: false
        }), messageService.send);
    
        messages.delete('/:msgId',
        passport.authenticate('bearer', {
            session: false
        }), messageService.delete);



    return messages;
})();
