'use strict';
process.env.NODE_ENV = 'test';

var request = require('supertest'),
    express = require('express'),
    expect = require('expect.js'),
    mongoose = require('mongoose'),
    userService = require("../../server/services/user");

var app = require('../../server.js');

describe('User Service', function() {
    it('should have a getUserByUserName method', function() {
        expect(userService.getUserByUserName).to.exist;
    });

    it('should have a create method', function() {
        expect(userService.create).to.exist;
    });
});