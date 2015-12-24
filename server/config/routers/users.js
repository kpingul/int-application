'use strict';
var express = require('express');
var passport = require('passport');
var userService = require('../../services/user');
var authService = require('../../services/auth');
var businessService = require('../../services/business');

module.exports = (function() {
  var user = express.Router();

  user.post('/', userService.createUser);

  user.get('/:username',
    passport.authenticate('bearer', {
      session: false
    }),
    authService.user.hasAuthorization,
    userService.getUserByUsername);


  //Get Contact details by contact id or by contact name

  user.get('/:username/contacts',
    passport.authenticate('bearer', {
      session: false
    }), 
    authService.user.hasAuthorization,
    userService.getContacts);

  user.get('/:username/contacts/:id',
    passport.authenticate('bearer', {
      session: false
    }), 
    authService.user.hasAuthorization,
    userService.findContactById, 
    userService.findContactByName);

  //create a new contact
  user.post('/:username/contacts',
    passport.authenticate('bearer', {
      session: false
    }), 
    authService.user.hasAuthorization,
    userService.createContact);

  //update a contact
  user.post('/:username/contacts/:id',
    passport.authenticate('bearer', {
      session: false
    }), 
    authService.user.hasAuthorization,
    userService.updateContact);

  //delete a contact
  user.delete('/:username/contacts/:id',
    passport.authenticate('bearer', {
      session: false
    }), 
    authService.user.hasAuthorization,
    userService.deleteContact);

  user.get('/:username/businesses',
    passport.authenticate('bearer', {
      session: false
    }),
    authService.user.hasAuthorization,
    businessService.getBusinessesByOwner);

  user.post('/:username',
    passport.authenticate('bearer', {
      session: false
    }),
    authService.user.hasAuthorization,
    userService.updateUser);

  return user;
})();
