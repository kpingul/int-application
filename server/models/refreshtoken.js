"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var refreshTokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
