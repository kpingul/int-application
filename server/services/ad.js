//message/inbox service
'use strict';
var DataContext = require('../data/datacontext.ad');
var logger = require('../common/logger');
var INVALID_USER = 'Invalid User / Authorization failed.';
var SERVER_ERROR = 'Sever Error';

exports.findAdById = function findAdById(req, res, next) {
	if (!req.user) {
		res.statusCode = 500;
		return res.send({
			error: INVALID_USER
		});
	}
	var id = req.params.id;
	DataContext.getAdById(id).then(function success(ad) {
		return res.send(ad);
	},
	function error(err) {
		logger.error(err);
		next();
	});
};

exports.findAdByBiz = function findAdByBiz(req, res) {
	if (!req.user) {
		res.statusCode = 500;
		return res.send({
			error: INVALID_USER
		});
	}
	var id = req.params.id;
	DataContext.getAdByBiz(id).then(function success(ads) {
		return res.send(ads);
	},
	function error(err) {
		logger.error(err);
		return res.send({
			error: SERVER_ERROR
		});
	});
};

exports.create = function create(req, res) {
	if (!req.user) {
		res.statusCode = 500;
		return res.send({
			error: INVALID_USER
		});
	}
	var ad = req.body;

	DataContext.createAd(req.user, ad).then(function success() {
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
};

exports.update = function update(req, res) {
	if (!req.user) {
		res.statusCode = 500;
		return res.send({
			error: INVALID_USER
		});
	}
	var ad = req.body;
	var id = req.params.id;
	DataContext.updateAd(ad, id).then(function success() {
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
};

exports.delete = function deleteAd(req, res) {
	if (!req.user) {
		res.statusCode = 500;
		return res.send({
			error: INVALID_USER
		});
	}
	var id = req.params.id;
	DataContext.deleteAd(id).then(function success() {
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
};

