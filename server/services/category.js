'use strict';
var DataContext = require('../data/datacontext.category');

exports.allCategories = function allCategories(req, res) {
    DataContext.getAllCategories()
        .then(function(cats) {
            return res.send(cats);
        }).fail(function(err) {
            res.status(400);
            return res.send({
                error: err.toString()
            });
        });
};