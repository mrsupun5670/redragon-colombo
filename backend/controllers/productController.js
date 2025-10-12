const Product = require('../models/Product');

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  const product = req.body;
  Product.create(product, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(result);
  });
};

exports.updateProduct = (req, res) => {
  const product = req.body;
  Product.update(req.params.id, product, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
};