const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    const query = 'SELECT * FROM products';
    db.query(query, callback);
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], callback);
  },
  create: (product, callback) => {
    const query = 'INSERT INTO products SET ?';
    db.query(query, product, callback);
  },
  update: (id, product, callback) => {
    const query = 'UPDATE products SET ? WHERE id = ?';
    db.query(query, [product, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Product;