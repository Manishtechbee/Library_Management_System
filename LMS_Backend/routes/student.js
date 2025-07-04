const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.post('/upload-profile/:userId', upload.single('profileImage'), (req, res) => {
  const userId = req.params.userId;
  const newImagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!newImagePath) return res.status(400).json({ message: 'Image upload failed' });

  // Step 1: Get student_id from users table
  const getStudentIdSql = `SELECT student_id FROM users WHERE id = ?`;
  db.query(getStudentIdSql, [userId], (err, userResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (!userResult.length || !userResult[0].student_id) {
      return res.status(404).json({ message: 'Student ID not found for this user' });
    }

    const studentId = userResult[0].student_id;

    // Step 2: Fetch existing image from students table using student_id
    const getImageSql = `SELECT profileImage FROM students WHERE student_id = ?`;
    db.query(getImageSql, [studentId], (err, studentResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      const oldImage = studentResult[0]?.profileImage;

      // Step 3: Delete old image file if exists
      if (oldImage) {
  const oldImagePath = path.join(__dirname, '..', oldImage.startsWith('/') ? oldImage.slice(1) : oldImage);
  console.log(oldImagePath);
  fs.unlink(oldImagePath, (err) => {
    if (err) console.error("Error deleting old image:", err);
  });
}

      // Step 4: Update new image path in students table
      const updateSql = `UPDATE students SET profileImage = ? WHERE student_id = ?`;
      db.query(updateSql, [newImagePath, studentId], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Profile image updated successfully', imagePath: newImagePath });
      });
    });
  });
});





// Get Student by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  // First get student_id from users table
  const getUserSql = `SELECT student_id FROM users WHERE id = ?`;
  db.query(getUserSql, [userId], (err, userResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (!userResult.length || !userResult[0].student_id) {
      return res.status(404).json({ message: 'Student ID not found for this user' });
    }

    const studentId = userResult[0].student_id;

    // Now fetch student details from students table using student_id
    const getStudentSql = `SELECT * FROM students WHERE student_id = ?`;
    db.query(getStudentSql, [studentId], (err, studentResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (!studentResult.length) {
        return res.status(404).json({ message: 'Student details not found' });
      }

      res.json(studentResult[0]);
    });
  });
});





module.exports=router