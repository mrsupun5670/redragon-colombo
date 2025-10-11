const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Don't crash the app if DB connection fails - just log the error
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.warn('WARNING: Server will continue without database connection. Please update .env with correct DB credentials.');
  } else {
    console.log('Connected to MySQL database successfully');
  }
});

// Handle connection errors gracefully
db.on('error', (err) => {
  console.error('Database error:', err.message);
});

module.exports = db;
