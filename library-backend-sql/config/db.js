// backend/config/db.js
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // or your DB user
  password: '12345', // your MySQL password
  database: 'library_db'
})

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err)
  } else {
    console.log('✅ Connected to MySQL Database')
  }
})

module.exports = db
