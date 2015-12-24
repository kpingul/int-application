'use strict';
/**
 * User route authorization
 */
exports.user = {
    hasAuthorization: function (req, res, next) {
        if (req.user.username !== req.params.username) {
            return res.send(401); //unauthorized
        }
        next();
    }
}

/**
 * Business route authorization
 */
exports.business = {
    hasAuthorization: function (req, res, next) {
        if (req.user.id !== req.body.owner) {
            return res.send(401); //unauthorized
        }
        next();
    }
}
