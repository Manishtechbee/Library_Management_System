const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// Fetch Fines for All Students
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      s.name AS student_name, s.student_id,
      SUM(
        CASE 
          WHEN bb.returned_date IS NULL AND bb.due_date < CURDATE() THEN DATEDIFF(CURDATE(), bb.due_date) * 10
          ELSE 0
        END
      ) AS total_fine
    FROM borrowed_books bb
    JOIN users u ON bb.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    GROUP BY s.name, s.student_id
    HAVING total_fine > 0
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const formatted = results.map(r => ({
      ...r,
      is_paid: false // Extend this if you track payments separately
    }));

    res.json(formatted);
  });
});

module.exports = router;
