'use strict';
var User = require('mongoose').model('User');
var encryption = require('../common/encryption');
var config = require('../config/config');
var logger = require('../common/logger');
var DataContext = require('../data/datacontext.user');
var uuid = require('node-uuid');
var sendgrid = require('sendgrid')(config.sendgrid.user, config.sendgrid.pass);
var INVALID_USER = 'Invalid User / Authorization failed.';
var SERVER_ERROR = 'Sever Error';

function getUserByUsername(req, res) {
  DataContext.findUserByUsername(req.params.username)
    .then(function(user) {
      if (!user) {
        res.statusCode = 404;
        return res.send({
          error: 'Not found'
        });
      } else {
        return res.send(user);
      }
    }).fail(function(err) {
      res.status(500);
      return res.send({
        error: err.toString()
      });
    });
}

function createUser(req, res) {
  var clientData = req.body;
  clientData.username = clientData.username.toLowerCase();
  clientData.salt = encryption.createSalt();
  encryption.hashPassword(clientData.salt, clientData.password).then(function(password) {
    clientData.password = password;
    DataContext.createUser(clientData).then(function(user) {
      return res.send(user);
    }).fail(function(err) {
      res.status(400);
      return res.send({
        error: err.toString()
      });
    });
  });
}

function updateUser(req, res) {
  var userUpdates = req.body;

  req.user.fName = userUpdates.fName;
  req.user.lName = userUpdates.lName;
  req.user.address = userUpdates.address;

  if (userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encryption.createSalt();
    encryption.hashPassword(req.user.salt, userUpdates.password)
      .then(passwordHashed)
      .then(function updateUser() {
        DataContext.updateUser(req.user).then(userUpdated).fail(updateFailed);
      });
  } else {
    DataContext.updateUser(req.user).then(userUpdated).fail(updateFailed);
  }

  function passwordHashed(password) {
    req.user.password = password;
  }

  function userUpdated(user) {
    return res.send(user);
  }

  function updateFailed(error) {
    if (error) {
      logger.error(error);
      res.status(500);
      return res.send({
        error: error
      });
    }
  }
}

function verifyVerificationToken(req, res) {
  if (!req.body.token) {
    res.status(500);
    return res.end();
  }
  //verify token and set user verified to true
  DataContext.verifyToken(req.body.token).then(function() {
    res.status(200);
    return res.end();
  }).fail(function(err) {
    res.status(500);
    logger.error(err);
    return res.send({
      error: err.toString()
    });
  });
}

function sendVerificationToken(req, res) {
  DataContext.findUserByEmail(req.body.email).then(function(user) {
    if (user && !user.verified) {
      var token = uuid.v4();
      DataContext.setVerificationToken(user.username, token).then(function() {
        var payload = {
          to: req.body.email,
          from: 'iNeedTreez ' + '<' + config.sendgrid.no_reply + '>',
          subject: 'iNeedTreez User Verification',
          html: "<p>Welcome to iNeedTreez</p> <p> Please visit <a href=http://ineedtreez-web-dev.azurewebsites.net/verify/" + token + ">http://ineedtreez-web-dev.azurewebsites.net/verify/" + token + "</a> to verify your account.</p>"
        };

        sendgrid.send(payload, function(err, json) {
          if (err) {
            logger.error(err);
            res.status(500);
            return res.send({
              error: err
            });
          } else {
            logger.debug("Message sent: " + response.message);
          }
          res.end();
        });
      });
    } else {
      res.status(500);
      return res.send({
        error: 'User not found or already verified.'
      });
    }
  });
}

function sendPasswordResetToken(req, res) {
  DataContext.findUserByEmail(req.body.email).then(function(user) {
    if (user) {
      var token = uuid.v4();
      DataContext.setResetToken(user.username, token).then(function() {

        var payload = {
          to: req.body.email,
          from: config.sendgrid.no_reply,
          subject: 'iNeedTreez Password Reset',
          html: "<p>Here is the password reset that you requested: </p> <p> Please visit:<a href=http://ineedtreez-web-dev.azurewebsites.net/reset/" + token + ">http://ineedtreez-web-dev.azurewebsites.net/reset/" + token + "</a> </p><p>You will be prompted to create a password and confirm it. Once the password has been created, you will be asked to log into the site using your newly created password.</p>The link above will be valid for three days."
        };
        sendgrid.send(payload, function(err, json) {
          if (err) {
            res.status(500);
            return res.send({
              error: err
            });
          } else {
            logger.debug(json);
          }
          res.end();
        });
      });
    } else {
      res.status(500);
      return res.send({
        error: 'Email not found.'
      });
    }
  });
}

function getContacts(req, res, next) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  DataContext.getContacts(req.user.username).then(function success(contact) {
      return res.send(contact);
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });

}

function findContactById(req, res, next) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;
  DataContext.getContactById(id).then(function success(contact) {
      return res.send(contact);
    },
    function error(err) {
      logger.error(err);
      next();
    });


}

function findContactByName(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;

  DataContext.getContactByName(id).then(function success(contact) {
      return res.send(contact);
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });


}

function createContact(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }

  var contact = req.body;
  DataContext.createContact(req.user, contact).then(function success() {
      res.status(201);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });

}

function updateContact(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var contact = req.body;
  var id = req.params.id;
  DataContext.updateContact(contact, id).then(function success() {
      res.status(201);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });



}

function deleteContact(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;

  DataContext.deleteContact(id).then(function success() {
      res.status(200);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      res.statusCode = 500;
      return res.send({
        error: SERVER_ERROR
      });
    });



}


module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  sendPasswordResetToken: sendPasswordResetToken,
  sendVerificationToken: sendVerificationToken,
  verifyVerificationToken: verifyVerificationToken,
  getUserByUsername: getUserByUsername,
  getContacts: getContacts,
  findContactById: findContactById,
  findContactByName: findContactByName,
  createContact: createContact,
  updateContact: updateContact,
  deleteContact: deleteContact


};
