var express = require('express');
var https = require('https');
var http = require('http');
var config = require('./server/config/config');
var app = express();

require('./server/config/mongoose')(config);
require('./server/config/express')(app, config);
require('./server/config/passport')(config);
require('./server/config/router')(app);

// Create an HTTP service.
app.listen(config.port);
console.log('listening on port ' + config.port + '...');

module.exports = app;