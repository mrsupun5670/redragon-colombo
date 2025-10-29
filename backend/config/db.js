const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  reconnect: true
});

const executeWithRetry = async (query, params = [], maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await pool.execute(query, params);
      return result;
    } catch (error) {
      console.log(`Database query attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'PROTOCOL_CONNECTION_LOST') {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
      
      throw error;
    }
  }
};

const queryWithRetry = async (query, params = [], maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await pool.query(query, params);
      return result;
    } catch (error) {
      console.log(`Database query attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'PROTOCOL_CONNECTION_LOST') {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
      
      throw error;
    }
  }
};

pool.executeWithRetry = executeWithRetry;
pool.queryWithRetry = queryWithRetry;

module.exports = pool;
