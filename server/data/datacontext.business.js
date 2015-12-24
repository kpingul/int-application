'use strict';
var mongoose = require('mongoose');
var Business = require('mongoose').model('Business');
var Q = require('q');
var logger = require('../common/logger');


/*
 ****** Business methods ******
 */
function searchBusinesses(categories, searchText, coords, maxDistance, skip, take) {
    var dfd = Q.defer();
    var total = 0;
    //build query
    var query = Business.find({});
    query.populate('categories');

    if (categories.length > 0) {
        query.where('categories').in(categories);
    }

    if (searchText) {
        //need this to be a full-text search in the future
        query.where('name').regex(new RegExp(searchText, 'i')); //case-insensitive
    }

    if (coords) {
        //long should be first
        query.where('loc').near({
            center: coords,
            maxDistance: maxDistance / 3959,
            spherical: true
        });
    }

    //get total before pagination
    query.count(function (err, count) {
        total = count;
    });

    //temp pagination
    query.skip(skip);
    query.limit(take);

    query.exec('find', function (err, result, stats) {
        if (err) {
            logger.error(err);
            dfd.reject(err);
        }
        dfd.resolve({
            meta: {
                totalCount: total
            },
            results: result
        });
    });

    return dfd.promise;
}

function createBusiness(businessObj) {
    var dfd = Q.defer();
    Business.create(businessObj, function callback(err, business) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(business);
        }
    });
    return dfd.promise;
}

function updateBusiness(businessObj) {
    var dfd = Q.defer();
    businessObj.save(function callback(err, business) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(business);
        }
    });
    return dfd.promise;
}

function findBusinessBySeoName(seoName) {
    var dfd = Q.defer();
    Business.findOne({
        seoName: seoName
    }, function (err, biz) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(biz);
        }
    });
    return dfd.promise;
}

function findBusinessesByOwner(owner) {
    var dfd = Q.defer();
    Business.find({
        owner: owner
    }, function (err, biz) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(biz);
        }
    });
    return dfd.promise;
}


module.exports = {
    findBusinessBySeoName: findBusinessBySeoName,
    updateBusiness: updateBusiness,
    createBusiness: createBusiness,
    searchBusinesses: searchBusinesses,
    findBusinessesByOwner: findBusinessesByOwner
};