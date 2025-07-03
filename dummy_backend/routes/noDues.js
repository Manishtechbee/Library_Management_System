const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

const logActivity = require('../utils/logActivity');
// File Upload Setup
const storage = multer.diskStorage({
  destination: './uploads/certificates',
  filename: (req, file, cb) => {
    cb(null, `nodues-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Request No Dues with Student Details
router.post('/request', (req, res) => {
  const { userId, studentName, student_id, year, department, semester } = req.body;

  const checkSql = `SELECT * FROM no_dues WHERE user_id = ?`;
  db.query(checkSql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length) {
      return res.status(400).json({ message: 'Request already exists' });
    }

    const insertSql = `
      INSERT INTO no_dues (user_id, student_name, student_id, year, department, semester)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(insertSql, [userId, studentName, student_id, year, department, semester], (err) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ message: 'No Dues request submitted' });
       // Log Activity
      logActivity(userId, "Submitted a No Dues request").catch(console.error("No dues not able to submit"));
    });
  });
});

// Get No Dues Status & Details
router.get('/status/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `SELECT * FROM no_dues WHERE user_id = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (!result.length) {
      return res.json(null);
    }

    res.json(result[0]);
  });
});

// Admin: Approve/Reject Request
router.put('/update/:userId', (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const sql = `UPDATE no_dues SET status = ? WHERE user_id = ?`;
  db.query(sql, [status, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'No Dues status updated' });
  });
});

// Admin: Upload Certificate
router.post('/upload/:userId', upload.single('certificate'), (req, res) => {
  const userId = req.params.userId;
  const filePath = `/uploads/certificates/${req.file.filename}`;

  const sql = `UPDATE no_dues SET certificate_url = ? WHERE user_id = ?`;
  db.query(sql, [filePath, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Certificate uploaded successfully', url: filePath });
  });
});

module.exports = router;
