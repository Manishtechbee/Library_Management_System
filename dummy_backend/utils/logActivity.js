const db = require('../config/db');

function logActivity(userId, activity) {
  const sql = "INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)";
  db.query(sql, [userId, activity], (err) => {
    if (err) console.error("Activity Log Error:", err);
  });
}

module.exports = logActivity;

