const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'maglev.proxy.rlwy.net',
  port: process.env.DB_PORT || 16747,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'TupUefyXKrMJQPVQxlHHkaYXHYsFJxRk',
  database: process.env.DB_NAME || 'lmsdb',
});


db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

module.exports = db;





