'use strict';
var DataContext = require('../data/datacontext.business');
var MessageDataContext = require('../data/datacontext.message');
var logger = require('../common/logger');

function getBusinessByName(req, res) {
    DataContext.findBusinessBySeoName(req.params.name)
        .then(function(biz) {
            if (!biz) {
                res.statusCode = 404;
                return res.end();
            } else {
                return res.send(biz);
            }
        }).fail(function(err) {
            logger.error(err);
            res.status(500);
            return res.send({
                error: err.toString()
            });
        });
}

function createBusiness(req, res) {
    var clientData = req.body;
    DataContext.createBusiness(clientData).then(function(business) {
        return res.send(business);
    }).fail(function(err) {
        logger.error(err);
        res.status(400);
        return res.send({
            error: err.toString()
        });
    });
}

function updateBusiness(req, res) {
    var clientData = req.body;
    DataContext.findBusinessBySeoName(req.body.seoName)
        .then(function(biz) {
            if (!biz) {
                res.statusCode = 404;
                return res.end();
            } else {
                biz.name = clientData.name;
                biz.description = clientData.description;
                //biz.tagImage = clientData.tagImage;
                biz.address = clientData.address;
                biz.phone = clientData.phone;
                biz.website = clientData.website;
                biz.hours = clientData.hours;

                DataContext.updateBusiness(biz).then(businessUpdated).fail(updateFailed);
            }
        }).fail(function(err) {
            logger.error(err);
            res.status(500);
            return res.send({
                error: err.toString()
            });
        });

    function businessUpdated(business) {
        return res.send(business);
    }

    function updateFailed(err) {
        logger.error(err);
        res.status(400);
        return res.send({
            error: err.toString()
        });
    }
}

function getMessages(req,res){
    //get messages where message :biz
}

function getBusinessesByOwner(req,res){
    DataContext.findBusinessesByOwner(req.user._id)
        .then(function(biz) {
            if (!biz) {
                res.statusCode = 404;
                return res.end();
            } else {
                return res.send(biz);
            }
        }).fail(function(err) {
            logger.error(err);
            res.status(500);
            return res.send({
                error: err.toString()
            });
        });
}

module.exports = {
    create: createBusiness,
    update: updateBusiness,
    getBusinessByName: getBusinessByName,
    getMessages:getMessages,
    getBusinessesByOwner:getBusinessesByOwner
};
