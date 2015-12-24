var config = require('../config/config');
var stripe = require("stripe")(
  "sk_test_KS6bIykE0EeNeATqgYYnMC8L"
);

function initPreSale(req, res, next) {
  console.log(req.body);
  var form = JSON.parse(req.body.form);
  stripe.customers.create({
    source: req.body.token,
    plan: req.body.plan,
    email: form.email,
    metadata: {
      desc: form.desc,
      affiliate: req.body.affiliate
    }
  }, function (err, customer) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(customer);
    res.status(200);
    return res.end();
  });
}


module.exports = {
  initPreSale: initPreSale
};