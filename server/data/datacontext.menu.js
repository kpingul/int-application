'use strict';

var mongoose = require('mongoose');
var Menu = require('mongoose').model('Menu');
var Biz = require('mongoose').model('Business');
var Q = require('q');
var self = this;
var LIMIT_MENU = 3; //TODO: need to read from DB
var LIMIT_MENU_CATEGORY = 3; //TODO: need to read from DB
var LIMIT_ITEMS = 4; //TODO: need to read from DB
/*
 ****** Menu methods ******
 */

exports.getMenuByBiz = function(id) {
  var dfd = Q.defer();
  var query = Menu.find({
    biz: id
  });
  query.exec(function callback(err, collection) {
    if (err) {
      dfd.reject(err);
    }
    dfd.resolve(collection);
  });
  return dfd.promise;
};

exports.getMenuById = function(id) {
  var dfd = Q.defer();
  Menu.findOne({
    _id: id
  }).exec(function(err, menu) {
    if (err) {
      return dfd.reject(err);
    }
    if (!menu) {
      dfd.reject(new Error("No Such Menu"));
    } else {
      dfd.resolve(menu);
    }
  });
  return dfd.promise;
};

exports.createMenu = function(user, menuObj) {
  var dfd = Q.defer();
  //Check if the business Exists and User is the Owner
  var bizId = menuObj.biz;
  Biz.findOne({
      _id: bizId,
      owner: user._id
    },
    function(err, biz) {
      if (err) {
        return dfd.reject(err);
      }
      if (!biz) {
        return dfd.reject(new Error("No Such Business"));
      }
      //Validate Business if the user can Add more menus
      if (biz.menus.length >= LIMIT_MENU) {
        return dfd.reject(new Error("Limit Exceeded"));
      }
      Menu.create(menuObj, function callback(err, menu) {
        if (err) {
          return dfd.reject(err);
        }
        //Add Entry to the menus list of business
        biz.menus.push(menu);
        biz.save(function callback(err, biz) {
          if (err) {
            return dfd.reject(err);
          } else {
            return dfd.resolve(menu);
          }
        });
      });
    });

  return dfd.promise;
};

exports.updateMenu = function(menuObj, id) {
  var dfd = Q.defer();
  self.getMenuById(id).then(function success(menu) {
      if (!menu) {
        return dfd.reject(new Error("Could not Find Menu"));
      }
      if (menuObj.categories.length > LIMIT_MENU_CATEGORY) {
        return dfd.reject(new Error("Category Limit Exceeded"));
      }
      //Check for each menu category items limit
      for (var i = 0; i < menuObj.categories.length; i++) {
        var catObj = menuObj.categories[i];
        if (catObj.items) {
          if (catObj.items.length > LIMIT_ITEMS) {
            return dfd.reject(new Error("MENU Item limits exceeded"));
          }
        }
      }
      menu.categories = menuObj.categories;
      menu.save(function callback(err, menu) {
        if (err) {
          dfd.reject(err);
        } else {
          dfd.resolve(menu);
        }
      });
    },
    function error(err) {
      dfd.reject(err);
    });

  return dfd.promise;
};

exports.deleteMenu = function(id) {
  var dfd = Q.defer();
  //Get the menu
  self.getMenuById(id).then(function success(menu) {
      if (!menu) {
        return dfd.reject(new Error("No Such Menu Exists"));
      }
      Biz.findOne({
        _id: menu.biz
      }).exec(function(err, biz) {
        if (err) {
          return dfd.reject(err);
        }
        if (!biz) {
          return dfd.reject(new Error("No Buziness exists for the menu"));
        }
        menu.remove(function(err) {
          if (err) {
            dfd.reject(err);
          } else {
            biz.menus.remove(id);
            biz.save(function(err, biz) {
              if (err) {
                return dfd.reject(err);
              }
              if (!biz) {
                return dfd.reject(new Error("Could not update Menus List"));
              }
              dfd.resolve();
            });
          }
        });

      });

    },
    function error(err) {
      dfd.reject(err);
    });

  return dfd.promise;
};
exports.createMenuCategory = function(id, catObj) {
  var dfd = Q.defer();
  Menu.findOne({
    _id: id
  }, function(err, menu) {
    if (err) {
      return dfd.reject(err);
    }
    if (!menu) {
      return dfd.reject(new Error("No Such Menu Id"));
    }
    //Validate Business if the user can Add more menu categories
    if (menu.categories.length > LIMIT_MENU_CATEGORY) {
      return dfd.reject(new Error("Category Limit Exceeded"));
    }
    //Check if Items exists and does not cross limits
    if (catObj.items) {
      if (catObj.items.length > LIMIT_ITEMS) {
        return dfd.reject(new Error("MENU Item limits exceeded"));
      }
    }
    menu.categories.push(catObj);
    menu.save(function callback(err, result) {
      if (err) {
        dfd.reject(err);
      } else {
        dfd.resolve(menu);
      }
    });

  });

  return dfd.promise;
};
exports.updateMenuCategory = function(catObj, id, cid) {
  var dfd = Q.defer();
  self.getMenuById(id).then(function success(menu) {
    if (!menu) {
      return dfd.reject(new Error("Could not Find Menu"));
    }
    if (catObj.items) {
      //Validate Items for LIMIT
      if (catObj.items.length > LIMIT_ITEMS) {
        return dfd.reject(new Error("MENU Item limits exceeded"));
      }
    }


    var found = 0;
    //Find the category
    for (var i = 0; i < menu.categories.length; i++) {
      var cat = menu.categories[i];
      //Check for the category id
      if (cat._id == cid) {
        //If matched update data
        found = 1;
        cat.name = catObj.name;
        cat.picture = catObj.picture;
        cat.items = catObj.items;
        menu.save(function callback(err, menu) {
          if (err) {
            dfd.reject(err);
          } else {
            dfd.resolve(menu);
          }
        });
        break;
      }
    }

    if (!found) {
      return dfd.reject(new Error("Category not found"));
    }
  });

  return dfd.promise;
};

exports.deleteMenuCategory = function(id, cid) {
  var dfd = Q.defer();
  //Get the menu
  self.getMenuById(id).then(function success(menu) {
    if (!menu) {
      return dfd.reject(new Error("No Such Menu Exists"));
    }
    var found = 0;
    //Find the category
    for (var i = 0; i < menu.categories.length; i++) {
      var cat = menu.categories[i];
      //Check for the category id
      if (cat._id == cid) {
        found = 1;
        //If matched update data
        menu.categories.splice(i, 1);
        menu.save(function callback(err, menu) {
          if (err) {
            return dfd.reject(err);
          } else {
            return dfd.resolve(menu);
          }
        });
        break;
      }
    }

    if (!found) {
      return dfd.reject(new Error("Category not found"));
    }

  });

  return dfd.promise;
};
