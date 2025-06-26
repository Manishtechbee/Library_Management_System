const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all resources with bookmark status for a student
router.get("/students/:studentId/resources", (req, res) => {
  const { studentId } = req.params;

  const sql = `
    SELECT r.*, 
           CASE WHEN b.id IS NOT NULL THEN TRUE ELSE FALSE END AS bookmarked
    FROM resources r
    LEFT JOIN bookmarks b ON r.id = b.resource_id AND b.student_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Toggle bookmark
router.post("/resources/bookmark", (req, res) => {
  const { student_id, resource_id, bookmarked } = req.body;

  if (!student_id || !resource_id || typeof bookmarked !== "boolean") {
    return res.status(400).json({ message: "Invalid request data" });
  }

  if (bookmarked) {
    // Remove bookmark
    const sql = "DELETE FROM bookmarks WHERE student_id = ? AND resource_id = ?";
    db.query(sql, [student_id, resource_id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to remove bookmark" });
      }
      res.json({ message: "Bookmark removed" });
    });
  } else {
    // Add bookmark
    const sql = "INSERT INTO bookmarks (student_id, resource_id) VALUES (?, ?)";
    db.query(sql, [student_id, resource_id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add bookmark" });
      }
      res.json({ message: "Bookmarked successfully" });
    });
  }
});

module.exports = router;
