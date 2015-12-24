'use strict';
var CategoryDataContext = require('../data/datacontext.category');
var BizDataContext = require('../data/datacontext.business');
var Q = require('q');


//ex: /api/businesses/search?categories=Products,Hydroponics&lat=90.54&long=100&maxDistance=20&text=searchtext&page=0&take=20

function validateCategories(req, res, next) {
    if (!req.query.categories) {
        req.query.categories = [];
        return next();
    }

    var promiseQueue =[];
    var lookups = [];
    
    req.query.categories = req.query.categories.split(',');

    CategoryDataContext.getAllCategories()
        .then(function(categories) {
            //validate that the category exists
            req.query.categories.forEach(function(queryCategoryName) {
                var isValid = false;
                categories.forEach(function(category) {
                    if (category.name === queryCategoryName) {
                        lookups.push(category);
                        isValid = true;
                    }
                });

                if (!isValid) {
                    res.statusCode = 404;
                    res.send({
                        error: 'Category not found'
                    });
                    res.end();
                }
            });
        })
        .then(function() {
            //also include child categories
            req.query.categories.forEach(function(queryCategoryName) {
                var queryPromise = CategoryDataContext.findDescendants(queryCategoryName)
                    .then(function(descendants) {
                        for (var i in descendants) {
                            lookups.push(descendants[i]);
                        }
                    });
                promiseQueue.push(queryPromise);
            });
            Q.all(promiseQueue).then(function() {
                if (res.statusCode !== 404) {
                    //we are valid
                    req.query.categories = lookups;
                    return next();
                }
            });
        });
}

function validateLocation(req, res, next) {
    if (!(req.query.lat && req.query.long)) {
        return next();
    }
    if (req.query.maxDistance) {
        if (isNaN(req.query.maxDistance) || req.query.maxDistance < 0) {
            req.query.maxDistance = 25; //DEFAULT ON INVALID
        }
    }
    //validate
    if (isNaN(req.query.lat) || isNaN(req.query.long)) {
        res.statusCode = 500;
        return res.send({
            error: 'Invalid location coordinates'
        });
    }
    return next();
}

function validateGeneral(req, res, next) {
    if (req.query.take) {
        if (isNaN(req.query.take)) {
            req.query.take = 20; //DEFAULT ON INVALID
        }
    }
    if (req.query.page) {
        if (isNaN(req.query.page)) {
            req.query.page = 1; //DEFAULT ON INVALID
        }
    }

    if (req.query.text) {
        //todo: full text search - sanitize input
    }
    return next();
}

function search(req, res) {
    var take = req.query.take || 20;
    var page = req.query.page || 0;
    var searchText = req.query.text;
    var categories = req.query.categories;
    var lat = req.query.lat;
    var long = req.query.long;
    var maxDistance = req.query.maxDistance || 25;
    var skip = page > 0 ? ((page - 1) * take) : 0;
    var coords = long && lat ? [long, lat] : undefined;


    BizDataContext.searchBusinesses(categories, searchText, coords, maxDistance, skip, take)
        .then(function(data) {
            if (data.results) {
                res.send(data);
            } else {
                res.statusCode = 404;
                res.send({
                    error: 'No results found',
                    message: err
                });
            }
        }).fail(function(err) {
            res.statusCode = 500;
        });
}

module.exports = {
    validateCategories: validateCategories,
    validateLocation: validateLocation,
    validateGeneral: validateGeneral,
    search: search
};