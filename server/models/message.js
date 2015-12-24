"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    sent: {
        type: Date,
        required: true,
        default: new Date()
    },
    message: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Number,
        min: 0,
        max: 3,
        default: 0,
        required: true
    },

    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    biz: {
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }
});

var Message = mongoose.model('Message', messageSchema);

Message.schema.path('to').validate(function (value) {
    return value.length > 0;
}, 'No Recipients Specified');
