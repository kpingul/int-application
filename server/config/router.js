'use strict';
module.exports = function (app, config) {
    app.use('/api/users', require('./routers/users'));
    app.use('/api/messages', require('./routers/message'));
    app.use('/api/businesses', require('./routers/business'));
    app.use('/api/search', require('./routers/search'));
    app.use('/api/auth', require('./routers/auth'));
    app.use('/api/images', require('./routers/images'));
    app.use('/api/geo', require('./routers/geofence'));
    app.use('/api/billing', require('./routers/billing'));
    app.use('/api/ad', require('./routers/ad'));
    app.use('/api/menu', require('./routers/menu'));
  
};
