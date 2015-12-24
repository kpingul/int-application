'use strict';

var mongoose = require('mongoose');
var Ad = require('mongoose').model('Ad');
var Biz = require('mongoose').model('Business');
var Q = require('q');
var self = this;
var LIMIT = 3; //TODO: need to read from DB

/*
 ****** Ad methods ******
 */

exports.getAdByBiz = function(id) {
	var dfd = Q.defer();
	var query = Ad.find({
		biz: id
	});
	query.exec(function callback(err, collection) {
		if (err) {
			dfd.reject(err);
		}
		dfd.resolve(collection);
	});
	return dfd.promise;
};

exports.getAdById = function(id) {
	var dfd = Q.defer();
	Ad.findOne({
		_id: id
	}).exec(function(err, ad) {
		if (err) {
			return dfd.reject(err);
		}
		if (!ad) {
			return dfd.reject(new Error("No Such Ad"));
		}
		else {
			dfd.resolve(ad);
		}
	});
	return dfd.promise;
};

exports.createAd = function(user, adObj) {
	var dfd = Q.defer();
	//Check if the business Exists and User is the Owner
	var bizId = adObj.biz;
	Biz.findOne({
		_id: bizId,
		owner: user._id
	},
	function(err, biz) {
		if (err) {
			return dfd.reject(err);
		}
		if (!biz) {
			return dfd.reject(new Error("No Such Business"));
		}
		//Validate Business if the user can Add more ads
		if (biz.ads.length >= LIMIT) {
			return dfd.reject(new Error("Limit Exceeded"));
		}
		Ad.create(adObj, function callback(err, ad) {
			if (err) {
				dfd.reject(err);
			}
			else {
				//Add Entry to the ads list of business
				biz.ads.push(ad);
				biz.save(function callback(err, biz) {
					if (err) {
						dfd.reject(err);
					}
					else {
						dfd.resolve(ad);
					}
				});
				dfd.resolve(ad);
			}
		});
	});

	return dfd.promise;
};

exports.updateAd = function(adObj, id) {
	var dfd = Q.defer();
	self.getAdById(id).then(function success(ad) {
		if (!ad) {
			return dfd.reject(new Error("Could not Find Ad"));
		}
		ad.imageUrl = adObj.imageUrl;
		ad.description = adObj.description;
		ad.save(function callback(err, ad) {
			if (err) {
				dfd.reject(err);
			}
			else {
				dfd.resolve(ad);
			}
		});
	},
	function error(err) {
		dfd.reject(err);
	});

	return dfd.promise;
};

exports.deleteAd = function(id) {
	var dfd = Q.defer();
	//Get the message
	self.getAdById(id).then(function success(ad) {
		if (!ad) {
			return dfd.reject(new Error("No Such Ad Exists"));
		}
		Biz.findOne({
			_id: ad.biz
		}).exec(function(err, biz) {
			if (err) {
				return dfd.reject(err);
			}
			if (!biz) {
				return dfd.reject(new Error("No Buziness exists for the ad"));
			}
			ad.remove(function(err) {
				if (err) {
					dfd.reject(err);
				}
				else {
					biz.ads.remove(id);
					biz.save(function(err, biz) {
						if (err) {
							return dfd.reject(err);
						}
						if (!biz) {
							return dfd.reject(new Error("Could not update Ads List"));
						}
						dfd.resolve();
					});
				}
			});

		});

	},
	function error(err) {
		dfd.reject(err);
	});
	return dfd.promise;
};

