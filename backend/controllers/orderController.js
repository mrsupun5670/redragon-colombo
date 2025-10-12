const Order = require('../models/Order');

exports.createOrder = (req, res) => {
  const order = req.body;
  Order.create(order, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(result);
  });
};