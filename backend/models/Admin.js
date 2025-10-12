const db = require('../config/db');

const Admin = {
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM admin WHERE username = ?';
    db.query(query, [username], callback);
  }
};

module.exports = Admin;