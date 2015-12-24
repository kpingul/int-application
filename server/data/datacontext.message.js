'use strict';

var mongoose = require('mongoose');
var Message = require('mongoose').model('Message');
var Q = require('q');
var self = this;

/*
 ****** Message methods ******
 */
exports.getUserInbox = function(user) {
    var dfd = Q.defer();
    var query = Message.find({})
        .populate('from', 'username')
        .populate('to', 'username')
        .populate('recipient', 'username')
        .or([{
            'recipient': user
        }, {
            'from': user
        }]) //messages to and from user to build conversations.
    .sort({
        sent: -1
    });
    query.exec(function callback(err, collection) {
        if (err) {
            dfd.reject(err);
        }
        dfd.resolve(collection);
    });
    return dfd.promise;
};

exports.findMessageById = function(messageId) {
    var dfd = Q.defer();
    Message.findOne({
        _id: messageId
    }, function(err, message) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(message);
        }
    });
    return dfd.promise;
};

exports.createMessage = function(fromUser, msg) {
    var dfd = Q.defer();
    var msgsToBeInserted = [];
    for (var recipient in msg.to) {
        var item = {
            from: fromUser._id,
            to: msg.to,
            message: msg.message
        }
        item.recipient = mongoose.Types.ObjectId(msg.to[recipient]);
        msgsToBeInserted.push(item);
    }

    Message.collection.insert(msgsToBeInserted, function cb(err, result) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(result);
        }
    });
    return dfd.promise;
};

exports.isSetBit = function(num, bit) {
  return ((num>>bit) % 2 !== 0);
};
exports.setBit = function(num, bit) {
  return num | 1 << bit;
};
exports.deleteMessage = function(user, messageId) {
	var dfd = Q.defer();
	//Get the message
	self.findMessageById(messageId).then(function success(message) {
		if (!message) {
			return dfd.reject(new Error("No Such Message Exists"));
		}
		//Check if the message is owned by the user
		if (!message.from.equals(user._id) && !message.recipient.equals(user._id)) {
			return dfd.reject(new Error("User does not own the message"));
		}
    //Check if the message was already deleted
    if(self.isSetBit(message.isDeleted, 0) && self.isSetBit(message.isDeleted, 1)) {
      return dfd.reject(new Error("Message already deleted"));
    }
      //Check if the message is from my Inbox and not deleted before
      if (!self.isSetBit(message.isDeleted, 0) && message.recipient.equals(user._id)) {
        message.isDeleted = self.setBit(message.isDeleted, 0);
      }
      //Check if the message is from my Sent Items
      else if (!self.isSetBit(message.isDeleted, 1) && message.from.equals(user._id)) {
        message.isDeleted = self.setBit(message.isDeleted, 1);
      }
      else{
        return dfd.reject(new Error("Message already deleted"));
      }
			message.save(function(err) {
				if (err) {
					dfd.reject(err);
				}
				else {
					dfd.resolve();
				}
			});

	},
	function error(err) {
		dfd.reject(err);
	});
	return dfd.promise;
};

