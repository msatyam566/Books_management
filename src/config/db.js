const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Satyam@8699",
  database: "books_management",
});

module.exports = pool.promise();
