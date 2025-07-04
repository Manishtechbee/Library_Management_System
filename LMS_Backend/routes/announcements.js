const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all relevant announcements
router.get('/', (req, res) => {
  const role = req.query.role || 'all';
  console.log(role);

  const sql = `
    SELECT * FROM announcements
    WHERE visible_to = 'all' OR visible_to = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [role], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Create a new announcement (Admin or Faculty)
router.post('/', (req, res) => {
  const { title, message, visible_to, created_by } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: 'Title and message are required' });
  }

  const sql = `
    INSERT INTO announcements (title, message, visible_to, created_by)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [title, message, visible_to || 'all', created_by || null], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Announcement created successfully', id: result.insertId });
  });
});

// Delete an announcement (Optional, only for Admin)
router.delete('/:id', (req, res) => {
  const announcementId = req.params.id;

  const sql = `DELETE FROM announcements WHERE id = ?`;

  db.query(sql, [announcementId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Announcement deleted successfully' });
  });
});

module.exports = router;
