'use strict';
var DataContext = require('../data/datacontext.menu');
var logger = require('../common/logger');
var INVALID_USER = 'Invalid User / Authorization failed.';
var SERVER_ERROR = 'Sever Error';

exports.findMenuById = function findMenuById(req, res, next) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;
  DataContext.getMenuById(id).then(function success(menu) {
      return res.send(menu);
    },
    function error(err) {
      logger.error(err);
      next();
    });
};

exports.findMenuByBiz = function findMenuByBiz(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;
  DataContext.getMenuByBiz(id).then(function success(menus) {
      return res.send(menus);
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });
};

exports.create = function create(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var menu = req.body;

  DataContext.createMenu(req.user, menu).then(function success() {
      res.status(201);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });
};

exports.update = function update(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var menu = req.body;
  var id = req.params.id;
  DataContext.updateMenu(menu, id).then(function success() {
      res.status(201);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });
};

exports.delete = function deleteMenu(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;
  DataContext.deleteMenu(id).then(function success() {
      res.status(200);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      res.statusCode = 500;
      return res.send({
        error: SERVER_ERROR
      });
    });
};
exports.addCategory = function addCategory(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;
  var category = req.body;

  DataContext.createMenuCategory(id, category).then(function success() {
      res.status(201);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });
};

exports.updateCategory = function updateCategory(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var category = req.body;
  var id = req.params.id;
  var cid = req.params.cid;
  DataContext.updateMenuCategory(category, id, cid).then(function success() {
      res.status(201);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      return res.send({
        error: SERVER_ERROR
      });
    });
};

exports.deleteCategory = function deleteCategory(req, res) {
  if (!req.user) {
    res.statusCode = 500;
    return res.send({
      error: INVALID_USER
    });
  }
  var id = req.params.id;
  var cid = req.params.cid;
  DataContext.deleteMenuCategory(id, cid).then(function success() {
      res.status(200);
      return res.send({
        success: true
      });
    },
    function error(err) {
      logger.error(err);
      res.statusCode = 500;
      return res.send({
        error: SERVER_ERROR
      });
    });
};
