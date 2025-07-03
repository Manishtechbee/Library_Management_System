const express = require("express");
const router = express.Router();
const db = require("../../config/db");

const logActivity = require('../../utils/logActivity');

// Fetch fines for a single student
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT id, fine_amount, reason, issued_date, paid 
    FROM fines 
    WHERE user_id = ? 
    ORDER BY issued_date DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
    
  });
});

// Pay a specific fine
router.post("/pay", (req, res) => {
  const { fine_id } = req.body;

  const sql = `UPDATE fines SET paid = 1 WHERE id = ?`;

  db.query(sql, [fine_id], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });

    }

     // Log Activity
    logActivity(user_id, "Paid a fine").catch(console.error("fine cant be paid"));
    res.json({ success: true, message: "Fine paid successfully" });
  });
});


// Pay all unpaid fines for a student
router.post("/pay-all", (req, res) => {
  console.log("Received",req.body);
  const { user_id } = req.body;
  console.log("Received user_id:", user_id);

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id in request" });
  }

  const sql = `UPDATE fines SET paid = 1 WHERE user_id = ? AND paid = 0`;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

     // Log Activity
    logActivity(user_id, "Paid all outstanding fines").catch(console.error("Fines cant be paid"));
    res.json({ success: true, message: "All unpaid fines marked as paid" });
  });
});





module.exports = router;
