const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const sql = `SELECT id, message FROM system_notifications ORDER BY created_at DESC LIMIT 5`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

module.exports = router;
