const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db'); // Assuming you have db connection separate, else copy your db connection here

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Upload Profile Image
router.post('/upload-profile/:id', upload.single('profileImage'), (req, res) => {
  const studentId = req.params.id;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imagePath) return res.status(400).json({ message: 'Image upload failed' });

  const sql = `UPDATE Students SET profileImage = ? WHERE id = ?`;
  db.query(sql, [imagePath, studentId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json({ message: 'Profile image updated successfully', imagePath });
  });
});

// Get Student by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM Students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

const bcrypt = require('bcrypt');

router.put("/update-password/:id", (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "SELECT password FROM Students WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ message: "User not found." });
    }

    const hashedPassword = results[0].password;

    // Compare oldPassword with hashed password
    bcrypt.compare(oldPassword, hashedPassword, (compareErr, isMatch) => {
      if (compareErr || !isMatch) {
        return res.status(400).json({ message: "Incorrect current password." });
      }

      // Hash the new password
      bcrypt.hash(newPassword, 10, (hashErr, hashedNewPassword) => {
        if (hashErr) {
          return res.status(500).json({ message: "Error hashing new password." });
        }

        const updateSql = "UPDATE Students SET password = ? WHERE id = ?";
        db.query(updateSql, [hashedNewPassword, id], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: "Failed to update password." });
          }
          res.json({ message: "Password updated successfully." });
        });
      });
    });
  });
});
router.put("/update-password/:id", (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  const sql = "SELECT password FROM Students WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ message: "User not found." });
    }

    if (results[0].password !== oldPassword) {
      return res.status(400).json({ message: "Incorrect current password." });
    }

    const updateSql = "UPDATE Students SET password = ? WHERE id = ?";
    db.query(updateSql, [newPassword, id], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: "Failed to update password." });
      }
      res.json({ message: "Password updated successfully." });
    });
  });
});




// Toggle bookmark
router.put("/resources/:id/bookmark", (req, res) => {
  const { id } = req.params;
  const { bookmarked } = req.body;
  db.query("UPDATE Resources SET bookmarked = ? WHERE id = ?", [bookmarked, id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to update bookmark" });
    res.json({ message: "Bookmark updated" });
  });
});


module.exports = router;
