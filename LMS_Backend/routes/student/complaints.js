const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const logActivity = require('../../utils/logActivity');


// Submit a complaint
router.post("/complaints/add", (req, res) => {
  const { user_id, subject, description } = req.body;

  if (!user_id || !subject || !description)
    return res.status(400).json({ message: "All fields are required" });

  const sql = `INSERT INTO complaints (user_id, subject, description) VALUES (?, ?, ?)`;
  db.query(sql, [user_id, subject, description], (err, result) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
    res.json({ success: true, message: "Complaint submitted successfully" });
    
    logActivity(user_id, "You submitted a complaint.");
  });
});

module.exports = router;
