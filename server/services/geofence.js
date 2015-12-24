'use strict';
var logger = require('../common/logger');
var geoip = require('geoip-lite');
var DataContext = require('../data/datacontext.geofence');
var MILES = 2; //TODO should come from DB

function capture(req, res) {
	var lat = req.query.lat;
	var lng = req.query.long;
	var user = req.user;

	//logger.info(user);
	if (!user || ! lat || ! lng) {
		res.status(400);
		return res.send({
			error: "Invalid Request"
		});
	}

	//capture user coords
	//determine businesses in radius
	DataContext.findBusinessByLoc(user, [lng, lat], MILES).then(function success(collection) {
	  
    //TODO send push message
		
    return res.send(collection);
	},
	function error(err) {
		logger.error(err);
		next();
	});
  
}

function locate(req, res) {
	logger.debug(req.ip);
	var geo = geoip.lookup(req.ip);
	res.send(geo);
}

module.exports = {
	capture: capture,
	locate: locate
};

