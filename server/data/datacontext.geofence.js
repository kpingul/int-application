'use strict';
var mongoose = require('mongoose');
var Business = require('mongoose').model('Business');
var Categories = require('mongoose').model('Category');
var Q = require('q');
var logger = require('../common/logger');
var self = this;

exports.getServiceCategories=function(user) {
	var dfd = Q.defer();
	//TODO Should be based on service level subscription
	var categories = ['transportation', 'delivery', 'gadgets-and-electronics'];

	var query = Categories.find({}).where('seoName').in(categories);
	query.exec(function callback(err, collection) {
		if (err) {
			dfd.reject(err);
		}
		dfd.resolve(collection);
	});

	return dfd.promise;
}
exports.findBusinessByLoc=function(user, coords, distanceInMiles) {
	var dfd = Q.defer();

	distanceInMiles = distanceInMiles || 1;

	//Get User Categories
	self.getServiceCategories(user).then(function success(categories) {
		if (!categories) {
			return dfd.reject(new Error("Could not get Categories"));
		}
    if (!coords) {
      return dfd.reject(new Error("Invalid Coordinates"));
    }
		var maxDistance = distanceInMiles / 3959;
		var query = Business.find({}).where('loc').near({
			center: coords,
			maxDistance: maxDistance,
			spherical: true
		});
		query.populate('categories');
		if (categories.length > 0) {
			query.where("categories").in(categories);
		}
		query.exec(function callback(err, collection) {
			if (err) {
        console.log(err);
				dfd.reject(err);
			}
			dfd.resolve(collection);
		});

	},
	function error(err) {
		dfd.reject(err);
	});

	return dfd.promise;
}

