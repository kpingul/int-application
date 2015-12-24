'use strict';
var expect = require('expect.js');
var encryption = require("../../server/common/encryption");

describe('encryption', function() {
    it('should have a salt method', function() {
        expect(encryption.createSalt).to.exist;
    });
    it('should have a hashPassword method', function() {
        expect(encryption.hashPassword).to.exist;
    });
});
