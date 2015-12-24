"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var q = require('q');
var encryption = require('../common/encryption');
var logger = require('../common/logger');
var config = require('../config/config');
var stripe = require("stripe")(
  config.stripe.apiKey
);
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  address: {
    street: String,
    country: String,
    state: String,
    postalCode: String,
    lat: String,
    long: String
  },
  fb: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  tw: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  }],
  password: {
    type: String,
    required: false
  },
  salt: {
    type: String,
    required: false
  },
  resetToken: String,
  verifyToken: String,
  verified: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  stripe: {
    customerId: String,
    subscriptionId: String,
    last4: String,
    plan: {
      type: String,
      default: config.stripe.defaultPlan
    }
  }
});

/**
 * Methods
 */
userSchema.methods.authenticate = function (pwd) {
  var dfd = q.defer();
  var pass = this.password;

  encryption.hashPassword(this.salt, pwd)
    .then(function (derivedKey) {
      if (derivedKey === pass) {
        dfd.resolve(true);
      } else {
        dfd.resolve(false);
      }
    });
  return dfd.promise;
};

userSchema.methods.createCustomer = function (cb) {
  var user = this;
  console.log('hello');
  stripe.customers.create({
    email: user.email
  }, function (err, customer) {
    if (err) return cb(err);

    user.stripe.customerId = customer.id;

    user.save(function (err) {
      if (err) return cb(err);
      return cb(null);
    });
  });
};

userSchema.methods.setCard = function (stripe_token, cb) {
  var user = this;

  var cardHandler = function (err, customer) {
    if (err) return cb(err);

    if (!user.stripe.customerId) {
      user.stripe.customerId = customer.id;
    }

    var card = customer.cards.data[0];
    user.stripe.last4 = card.last4;
    user.save(function (err) {
      if (err) return cb(err);
      return cb(null);
    });
  };

  if (user.stripe.customerId) {
    stripe.customers.update(user.stripe.customerId, {
      card: stripe_token
    }, cardHandler);
  } else {
    stripe.customers.create({
      email: user.email,
      card: stripe_token
    }, cardHandler);
  }
};

userSchema.methods.setPlan = function (plan, stripe_token, cb) {
  var user = this,
    customerData = {
      plan: plan
    };

  var subscriptionHandler = function (err, subscription) {
    if (err) return cb(err);

    user.stripe.plan = plan;
    user.stripe.subscriptionId = subscription.id;
    user.save(function (err) {
      if (err) return cb(err);
      return cb(null);
    });
  };

  var createSubscription = function () {
    stripe.customers.createSubscription(
      user.stripe.customerId, {
        plan: plan
      },
      subscriptionHandler
    );
  };

  if (stripe_token) {
    user.setCard(stripe_token, function (err) {
      if (err) return cb(err);
      createSubscription();
    });


  } else {
    if (user.stripe.subscriptionId) {
      // update subscription
      stripe.customers.updateSubscription(
        user.stripe.customerId,
        user.stripe.subscriptionId, {
          plan: plan
        },
        subscriptionHandler
      );
    } else {
      createSubscription();
    }
  }
};

userSchema.methods.updateStripeEmail = function (cb) {
  var user = this;

  if (!user.stripe.customerId) return cb();

  stripe.customers.update(user.stripe.customerId, {
    email: user.email
  }, function (err, customer) {
    cb(err);
  });
};

userSchema.methods.cancelStripe = function (cb) {
  var user = this;

  if (user.stripe.customerId) {
    stripe.customers.del(
      user.stripe.customerId
    ).then(function (confirmation) {
      cb();
    }, function (err) {
      return cb(err);
    });
  } else {
    cb();
  }
};

userSchema.virtual('userId').get(function () {
  return this.id;
});

userSchema.statics.getPlans = function () {
  return config.stripe.planData;
};


/*
 * Validation
 */
userSchema.path('email').validate(function (value) {
  var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return pattern.test(value);
}, 'Invalid Email');

userSchema.path('username').validate(function (value) {
  var pattern = /^[A-Za-z0-9_]+$/;
  return pattern.test(value);
}, 'Invalid Username');

userSchema.path('password').validate(function (value) {
  //TODO: only require for local login. Generate otherwise
  return value.length >= 8;
}, 'Password minimum of 8 characters');

/*
 * Transformations
 */
userSchema.pre('save', function (next) {
  var user = this;//TODO:handle duplicate customers in stripe
  if (!user.isNew || user.stripe.customerId) return next();
  user.createCustomer(function (err) {
    if (err) return next(err);
    next();
  });
  next();
});

module.exports = mongoose.model('User', userSchema);
