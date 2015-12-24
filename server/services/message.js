//message/inbox service
'use strict';
var DataContext = require('../data/datacontext.message');
var logger = require('../common/logger');
var INVALID_USER = 'Invalid User / Authorization failed.';
var SERVER_ERROR = 'Sever Error';


exports.all = function allMessages(req, res) {
    if (!req.user) {
        res.statusCode = 500;
        return res.send({
            error: INVALID_USER
        });
    } else {
        DataContext.getUserInbox(req.user)
            .then(function success(messages) {
                return res.send(messages);
            }, function error(err) {
                logger.error(err);
                return res.send({
                    error: SERVER_ERROR
                });
            });
    }
}

exports.send = function sendMessage(req, res) {
    if (!req.user) {
        res.statusCode = 500;
        return res.send({
            error: INVALID_USER
        });
    } else {
        var msg = req.body;
        DataContext.createMessage(req.user, msg)
            .then(function success() {
                res.status(201);
                return res.send({
                    success: true
                });
            }, function error(err) {
                logger.error(err);
                return res.send({
                    error: SERVER_ERROR
                });
            });
    }
}

//TODO:need to rethink deletes..
exports.delete = function deleteMessage(req, res) {
	if (!req.user) {
		res.statusCode = 500;
		return res.send({
			error: INVALID_USER
		});
	}
	var msgId = req.params.msgId;
   
	DataContext.deleteMessage(req.user, msgId).then(function success() {
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
