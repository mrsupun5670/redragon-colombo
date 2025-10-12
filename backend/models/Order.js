const db = require('../config/db');

const Order = {
  create: (order, callback) => {
    const query = 'INSERT INTO orders SET ?';
    db.query(query, order, callback);
  }
};

module.exports = Order;