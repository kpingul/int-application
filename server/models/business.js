'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../common/logger');
var utilities = require('../common/utilities');
var sanitizeHtml = require('sanitize-html');
var allowedTags = []; //no html input


var businessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  seoName: String,
  hours: {
    sun: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    },
    mon: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    },
    tue: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    },
    wed: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    },
    thu: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    },
    fri: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    },
    sat: {
      open: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      },
      close: {
        hh: {
          type: Number,
          min: 0,
          max: 24
        },
        mm: {
          type: Number,
          min: 0,
          max: 59
        }
      }
    }
  },
  description: String,
  tagImage: String,
  background: String,
  images: [String],
  address: {
    street: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    state: String,
    city: String,
    postalCode: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      min: -90,
      max: 90
    },
    long: {
      type: Number,
      min: -180,
      max: 180
    }
  },
  loc: {
    type: [Number],
    index: '2d'
  },
  phone: {
    type: String,
    required: true
  },
  website: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
    }],
  ads: [{
    type: Schema.Types.ObjectId,
    ref: 'Ad',
    }],
  menus: [{
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    }],
  verified: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  }
});

var Business = mongoose.model('Business', businessSchema);

/*
 * Transformations
 * This is used to sanitize input from the client.
 */
Business.schema.pre('save', function (next) {
  // do stuff
  if (this.name) {
    this.name = sanitizeHtml(this.name, {
      allowedTags: allowedTags
    });
  }
  if (this.description) {
    this.description = sanitizeHtml(this.description, {
      allowedTags: allowedTags
    });
  }
  if (this.website) {
    this.website = sanitizeHtml(this.website, {
      allowedTags: allowedTags
    });
  }
  if (this.phone) {
    this.phone = sanitizeHtml(this.phone, {
      allowedTags: allowedTags
    });
  }
  if (this.hours) {
    this.hours = sanitizeHtml(this.hours, {
      allowedTags: allowedTags
    });
  }
  if (this.address) {
    this.address.street = sanitizeHtml(this.address.street, {
      allowedTags: allowedTags
    });
    this.address.country = sanitizeHtml(this.address.country, {
      allowedTags: allowedTags
    });
    this.address.state = sanitizeHtml(this.address.state, {
      allowedTags: allowedTags
    });
    this.address.city = sanitizeHtml(this.address.city, {
      allowedTags: allowedTags
    });
    this.address.postalCode = sanitizeHtml(this.address.postalCode, {
      allowedTags: allowedTags
    });
  }
  next();
});


Business.schema.pre('save', function (next) {
  this.seoName = utilities.slugify(this.name);
  next();
});


//TODO:validate phone numbers & category
//^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$

//http://docs.mongodb.org/manual/tutorial/model-tree-structures/#model-tree-structures-with-materialized-paths
