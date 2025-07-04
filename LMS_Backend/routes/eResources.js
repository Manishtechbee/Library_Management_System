const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Fetch 
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM e_resources 
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(results);
    res.json(results);
  });
});





// POST create a new resource
router.post("/add", (req, res) => {
  const { title, description, type, section, link } = req.body;
  if (!title || !type || !section || !link)
    return res.status(400).json({ message: "Missing required fields" });

  const sql = "INSERT INTO e_resources (title, description, type, section, link) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, description, type, section, link], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Resource added", id: result.insertId });
  });
});

// DELETE a resource
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM e_resources WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Resource deleted" });
  });
});

module.exports = router;
