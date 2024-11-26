// config/db.config.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = async () => {
  return await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

module.exports = db;