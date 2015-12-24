'use strict';
var multiparty = require('multiparty');
var azure = require('azure-storage');
var config = require('../config/config');
var logger = require('../common/logger');
var uuid = require('node-uuid');


exports.upload = function upload(req, res) {
    var form = new multiparty.Form();
    var size = '';
    var fileName = '';

    // Errors may be emitted
    form.on('error', function (err) {
        logger.error('Error parsing form: ' + err.stack);
        res.statusCode = 500;
        res.end();
    });

    form.on('part', function (part) {
        var fileExtRegex = new RegExp(/\.(jpg|gif|png|jpeg)/g);
        if (part.filename.length === 0 || !fileExtRegex.test(part.filename)) {
            res.statusCode = 400;
        } else {
            var token = uuid.v4();

            size = part.byteCount;
            fileName = token + "." + part.filename.split('.').pop();
            logger.debug('filename: ' + fileName);
            logger.debug('fileSize: ' + (size / 1024));

            var blobService = azure.createBlobService(config.azure.storageAccount, config.azure.accessKey);
            blobService.createBlockBlobFromStream(config.azure.container, fileName, part, size, function (error) {
                if (error) {
                    logger.error(error);
                } else {
                    res.statusCode = 201; //created
                    res.json({
                        path: config.imageBase + fileName
                    });
                    res.end();
                }
            });
        }
    });


    form.on('file', function (name, file) {
        logger.debug(name);
    });

    form.on('close', function () {
        logger.debug("Close Called - Conn. Closing");
    });
    form.parse(req);
};
