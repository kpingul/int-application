'use strict';
var mongoose = require('mongoose');
var Category = require('mongoose').model('Category');
var Business = require('mongoose').model('Business');

var data = require('./scrape.json');

var Q = require('q');

exports.seedCategories = function () {

    var dfd = Q.defer();
    Category.remove({}, function (err) {
        if (err) {
            dfd.reject(err);
        } else {
            //create categories
            var cats = [
                ///1
                {
                    name: "Legal",
                    seoName: "legal"
                }, {
                    name: "Doctors",
                    path: ",Legal,",
                    seoName: "doctors"
                }, {
                    name: "Attorneys",
                    path: ",Legal,",
                    seoName: "attorneys"
                }, {
                    name: "Security",
                    path: ",Legal,",
                    seoName: "security"
                },

                ///2
                {
                    name: "Products",
                    seoName: "products"
                },
                {
                    name: "Wearables",
                    path: ",Products,",
                    seoName: "wearables"
                }, {
                    name: "Edibles",
                    path: ",Products,",
                    seoName: "edibles"
                }, {
                    name: "Personal Care",
                    path: ",Products,",
                    seoName: "personal-care"
                }, {
                    name: "Health",
                    path: ",Products,",
                    seoName: "health"
                },

                ///3
                {
                    name: "Treez",
                    seoName: "treez"
                },
                {
                    name: "Dispensaries",
                    path: ",Treez,",
                    seoName: "dispensaries"
                }, {
                    name: "Delivery",
                    path: ",Treez,",
                    seoName: "delivery"
                }, {
                    name: "Transport",
                    path: ",Treez,",
                    seoName: "transport"
                },

                ///4
                {
                    name: "Tools",
                    seoName: "tools"
                },
                {
                    name: "Growing",
                    path: ",Tools,",
                    seoName: "growing"
                }, {
                    name: "Smoke & Vape",
                    path: ",Tools,",
                    seoName: "smoke-and-vape"
                }

            ];
            Category.create(cats);
            dfd.resolve();
        }
    });

    return dfd.promise;
}

exports.seedBusinesses = function () {
    Category.find({
        name: {
            $in: ['Dispensaries', 'Delivery', ]
        }
    }, function (err, cat) {
        Business.remove({}, function (err) {
            var businesses = [];
            for (var i = 0; i < 1000; i++) {
                var biz = {
                    name: data[i].FIELD1,
                    //seoName: convertToSlug(data[i].FIELD1),
                    phone: data[i].FIELD7,
                    owner: "53bde1fe9f84f98075b4b215",
                    categories: [
                        cat[Math.floor(Math.random() * 1)]._id, //these are all dispensaries
                    ],
                    address: {
                        street: data[i].FIELD3,
                        country: 'USA',
                        state: data[i].FIELD5,
                        city: data[i].FIELD4 || '',
                        postalCode: data[i].FIELD6,
                    },
                    loc: [data[i].FIELD9, data[i].FIELD8] //longxlat                    
                }
                businesses.push(biz);
            }
            //console.log(businesses);
            Business.create(businesses, function (err) {
                console.log(err);
            });
        });
    });
}