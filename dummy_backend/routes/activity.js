const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Log Activity
router.post('/', (req, res) => {
  const { userId, activity } = req.body;
  const sql = "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)";
  db.query(sql, [userId, activity], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Activity logged" });
  });
});

// Fetch Recent Activity
router.get('/:userId', (req, res) => {
  const sql = "SELECT activity, timestamp FROM activity_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT 10";
  db.query(sql, [req.params.userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

module.exports = router;
