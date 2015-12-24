'use strict';

var mongoose = require('mongoose');
var Category = require('mongoose').model('Category');
var Q = require('q'); //using promises for simpler functions down the line...

/*
 ****** Category methods ******
 */

function getAllCategories() {
    var dfd = Q.defer();
    Category.find({}).sort('sortOrder').exec(function(err, categories) {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(categories);
        }
    });
    return dfd.promise;
}

function findDescendants(categoryName) {
    var dfd = Q.defer();
    Category.findOne({
            name: categoryName
        },
        function(err, category) {
            if (err || !category) {
                dfd.reject(err);
            } else {

                var regex = category.path ?
                    new RegExp("," + category.name + ",") :
                    new RegExp("^," + category.name + ","); //top-level category

                Category.find({
                    path: regex
                }, function(err, descendants) {
                    if (err || !descendants) {
                        dfd.reject(err);
                    } else {
                        dfd.resolve(descendants);
                    }
                });
            }
        });
    return dfd.promise;
}

module.exports = {
    findDescendants : findDescendants,
    getAllCategories: getAllCategories
};
