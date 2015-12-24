'use strict';
process.env.NODE_ENV = 'test';

var app = require('../../../server.js');
var request = require('supertest'),
    expect = require('expect.js'),
    encryption = require('../../../server/common/encryption'),
    User = require('mongoose').model('User'),
    userService = require('../../../server/services/user');

var testUsername = 'testee123';
var testPass = 'password';
var testUser;

describe('User API', function () {
    beforeEach(function (done) {
        //create the test user
        var salt = encryption.createSalt();
        encryption.hashPassword(salt, testPass)
            .then(function (hashedPass) {
                User.create({
                    "username": testUsername,
                    "email": "testee123@testmail.com",
                    "password": testPass,
                    "salt": salt,
                    "fName": "first",
                    "lName": "last",
                    "address": {
                        "postalCode": 42819,
                        "country": "CA"
                    }
                }, function cb(err, user) {
                    testUser = user;
                    done();
                });
            });
    });

    afterEach(function (done) {
        //delete test user
        User.remove(function (err, user) {
            done();
        })
    });

    describe('GET /api/users/:username', function () {
        it('should return 401 unauthorized when no token is passed', function (done) {
            request(app)
                .get('/api/users/testUserName')
                .expect(401, done);
        });
    });

});
