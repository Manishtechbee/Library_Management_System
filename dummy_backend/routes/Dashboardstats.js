const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get Dashboard Stats by User ID directly
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM borrowed_books WHERE user_id = ?) AS totalIssued,
      (SELECT COUNT(*) FROM borrowed_books WHERE user_id = ? AND due_date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)) AS dueSoon,
      (SELECT IFNULL(SUM(fine_amount), 0) FROM fines WHERE user_id = ? AND paid=0) AS unpaidFines
  `;

  db.query(statsQuery, [userId, userId, userId], (err, statsResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(statsResult[0]);
  });
});

module.exports = router;
