'use strict';
var crypto = require('crypto');
var q = require('q');

function createSalt(){
    return crypto.randomBytes(256).toString('base64');
}

function hashPassword(salt, pwd) {
    var dfd = q.defer();
    crypto.pbkdf2(pwd, salt, 10000, 512, function(err, derivedKey) {
        if (!err) {
            dfd.resolve(derivedKey.toString('base64'));
        } else {
            dfd.reject(err);
        }
    });
    return dfd.promise;
}

module.exports = {
    createSalt : createSalt,
    hashPassword: hashPassword
};