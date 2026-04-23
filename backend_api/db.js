const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'small_app',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Promisify for async/await
const promisePool = pool.promise();

// Initialize database and create table
const initDB = async () => {
  try {
    // Create database if not exists (for local development)
    if (process.env.NODE_ENV !== 'production') {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
      });
      
      await connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'small_app'}`);
      await connection.end();
      console.log('Database ensured');
    }
    
    // Create items table
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Small App MySQL database initialized');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

initDB();

module.exports = promisePool;