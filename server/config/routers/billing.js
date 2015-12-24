'use strict';
var express = require('express');
var stripeService = require('../../services/stripe');
module.exports = (function () {
  var billing = express.Router();
  
  billing.post('/token_accept', stripeService.initPreSale);
  
  return billing;
})();