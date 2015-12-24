'use strict';
var mongoose = require('mongoose');
var fs = require('fs');
module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Db connection opened...');
    });


    // Bootstrap models
    var models_path = config.rootPath + '/server/models'
    fs.readdirSync(models_path).forEach(function(file) {
        if (~file.indexOf('.js')) require(models_path + '/' + file)
    });


    //seed some data..
            //var seed = require('../../tests/seed');
            //seed.seedCategories()
                //.then(seed.seedBusinesses);
};
