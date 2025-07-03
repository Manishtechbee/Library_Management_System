const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Toggle bookmark (Add if not exists, remove if exists)
router.put("/:id/bookmark", (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ message: "Missing user_id" });

  const checkSql = "SELECT * FROM bookmarks WHERE user_id = ? AND resource_id = ?";
  db.query(checkSql, [user_id, id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });

    if (results.length > 0) {
      const deleteSql = "DELETE FROM bookmarks WHERE user_id = ? AND resource_id = ?";
      db.query(deleteSql, [user_id, id], (err) => {
        if (err) return res.status(500).json({ message: "Server error", error: err });
        res.json({ message: "Bookmark removed", bookmarked: false });
      });
    } else {
      const insertSql = "INSERT INTO bookmarks (user_id, resource_id, created_at) VALUES (?, ?, NOW())";
      db.query(insertSql, [user_id, id], (err) => {
        if (err) return res.status(500).json({ message: "Server error", error: err });
        res.json({ message: "Bookmark added", bookmarked: true });
      });
    }
  });
});

// Get all resources with bookmark status
router.get("/", (req, res) => {
  const userId = req.query.user_id;

  const sql = `
    SELECT e.*, 
      CASE WHEN b.id IS NULL THEN 0 ELSE 1 END AS bookmarked
    FROM e_resources e
    LEFT JOIN bookmarks b ON e.id = b.resource_id AND b.user_id = ?
    ORDER BY e.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    res.json(results);
  });
});

// Get only bookmarked resources
router.get("/bookmarked", (req, res) => {
  const userId = req.query.user_id;

  const sql = `
    SELECT e.*
    FROM e_resources e
    INNER JOIN bookmarks b ON e.id = b.resource_id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    res.json(results);
  });
});

module.exports = router;
