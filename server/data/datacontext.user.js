'use strict';

var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var Contact = require('mongoose').model('Contact');
var Q = require('q'); //using promises for simpler functions down the line...

var logger = require('../common/logger');
var self;
/*
 ****** User methods ******
 */

function findUserByUsername(username) {
  var dfd = Q.defer();
  var select = 'username fName lName created verified _id address contacts';
  User.findOne({
    username: username
  }).select(select).populate('contacts', '_id name phone').exec(function(err, user) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(user);
    }
  });
  return dfd.promise;
}

function findUserByEmail(email) {
  var dfd = Q.defer();
  var select = 'username fName lName created verified _id address contacts';
  User.findOne({
    email: email
  }).select(select).populate('contacts', '_id name phone').exec(function(err, user) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(user);
    }
  });
  return dfd.promise;
}

function createUser(userObj) {
  var dfd = Q.defer();
  User.create(userObj, function callback(err, user) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(user);
    }
  });
  return dfd.promise;
}

function updateUser(UserObj) {
  var dfd = Q.defer();
  UserObj.save(function callback(err, user) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(user);
    }
  });
  return dfd.promise;
}

function setVerificationToken(username, token) {
  var dfd = Q.defer();
  var query = {
    username: username
  };
  User.findOneAndUpdate(query, {
    verifyToken: token
  }, function(err) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(true);
    }
  });
  return dfd.promise;
}

function verifyToken(token) {
  var dfd = Q.defer();
  var query = {
    verifyToken: token,
    verified: false
  };
  User.findOneAndUpdate(query, {
    verified: true
  }, function(err, user) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(true);
    }
  });
  return dfd.promise;
}

function setResetToken(username, token) {
  var dfd = Q.defer();
  var query = {
    username: username
  };
  User.findOneAndUpdate(query, {
    resetToken: token
  }, function(err) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(true);
    }
  });
  return dfd.promise;
}

function verifyResetToken(token) {
    var dfd = Q.defer();
    var query = {
      resetToken: token
    };
    User.findOneAndUpdate(query, {
      resetToken: ''
    }, function(err, user) {
      if (err) {
        dfd.reject(err);
      } else {
        dfd.resolve(user);
      }
    });
    return dfd.promise;
  }
  /*
   ****** Contact methods ******
   */

function getContactByName(name) {
  var dfd = Q.defer();
  var query = Contact.find({
    name: name
  });
  query.select('_id name phone').exec(function callback(err, collection) {
    if (err) {
      dfd.reject(err);
    }
    if (!collection || collection.length <= 0) {
      dfd.reject(new Error("Could not find contact"));
    }
    dfd.resolve(collection);
  });
  return dfd.promise;
}

function getContactById(id) {
  var dfd = Q.defer();
  Contact.findOne({
    _id: id
  }).select('_id name phone user').exec(function(err, contact) {
    if (err) {
      return dfd.reject(err);
    }
    if (!contact) {
      return dfd.reject(new Error("No Such Contact"));
    } else {
      dfd.resolve(contact);
    }
  });
  return dfd.promise;
}

function getContacts(username) {
  var dfd = Q.defer();
  self.findUserByUsername(username).then(function success(user) {
      if (!user) {
        return dfd.reject(new Error("Could not Find Username"));
      }
      dfd.resolve(user.contacts);
    },
    function error(err) {
      dfd.reject(err);
    });

  return dfd.promise;

}

function createContact(user, contactObj) {
  var dfd = Q.defer();
  //Check if the business Exists and User is the Owner
  contactObj.user = user;
  Contact.create(contactObj, function callback(err, contact) {
    if (err) {
      return dfd.reject(err);
    }
    user.contacts.push(contact);
    user.save(function(err, user) {
      if (err) {
        return dfd.reject(err);
      }
      return dfd.resolve(contact);
    });
  });

  return dfd.promise;
}

function updateContact(contactObj, id) {
  var dfd = Q.defer();
  self.getContactById(id).then(function success(contact) {
      if (!contact) {
        return dfd.reject(new Error("Could not Find Contact"));
      }
      contact.name = contactObj.name;
      contact.phone = contactObj.phone;
      contact.save(function callback(err, contact) {
        if (err) {
          dfd.reject(err);
        } else {
          dfd.resolve(contact);
        }
      });
    },
    function error(err) {
      dfd.reject(err);
    });

  return dfd.promise;
}

function deleteContact(id) {
  var dfd = Q.defer();
  //Get the message
  self.getContactById(id).then(function success(contact) {
      if (!contact) {
        return dfd.reject(new Error("No Such Contact Exists"));
      }
      User.findOne({
        _id: contact.user
      }).exec(function(err, user) {
        if (err) {
          return dfd.reject(err);
        }
        if (!user) {
          return dfd.reject(new Error("No User Exists"));
        }
        contact.remove(function(err) {
          if (err) {
            dfd.reject(err);
          } else {
            user.contacts.remove(id);
            user.save(function(err, user) {
              if (err) {
                return dfd.reject(err);
              }
              if (!user) {
                return dfd.reject(new Error("Could not update user contact list  "));
              }
              dfd.resolve(contact);
            });
          }
        });

      });

    },
    function error(err) {
      dfd.reject(err);
    });
  return dfd.promise;
}

module.exports = self = {
  findUserByUsername: findUserByUsername,
  findUserByEmail: findUserByEmail,
  createUser: createUser,
  updateUser: updateUser,
  setVerificationToken: setVerificationToken,
  verifyToken: verifyToken,
  setResetToken: setResetToken,
  verifyResetToken: verifyResetToken,
  getContacts: getContacts,
  getContactByName: getContactByName,
  getContactById: getContactById,
  createContact: createContact,
  updateContact: updateContact,
  deleteContact: deleteContact


};
