const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// Fetch Overdue Books with Days Overdue
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      bb.id, bb.due_date,
      DATEDIFF(CURDATE(), bb.due_date) AS days_overdue,
      s.name AS student_name, s.student_id,
      b.title AS book_title
    FROM borrowed_books bb
    JOIN users u ON bb.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    JOIN books b ON bb.book_id = b.id
    WHERE bb.returned_date IS NULL AND bb.due_date < CURDATE()
    ORDER BY bb.due_date ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
