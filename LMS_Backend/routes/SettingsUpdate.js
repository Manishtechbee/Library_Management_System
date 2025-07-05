const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const notify = require('../controllers/notificationController');
const logActivity = require('../utils/logActivity');


// Update Password
router.put('/update-password/:id', async (req, res) => {
  const studentId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  const sql = `
    SELECT u.password FROM users u
    JOIN students s ON u.student_id = s.student_id
    WHERE u.id = ?
  `;

  db.query(sql, [studentId], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(oldPassword, results[0].password);
    if (!valid) return res.status(400).json({ message: "Incorrect current password" });

    const hashed = await bcrypt.hash(newPassword, 10);

    db.query(
      `UPDATE users u
      JOIN students s ON u.student_id = s.student_id
      SET u.password = ?
      WHERE u.id = ?`,
      [hashed, studentId],
      (err) => {
        if (err) return res.status(500).json({ message: "Failed to update password" });

        // Send Notification
        notify.sendNotification(
          studentId,
          "Your account password was changed successfully. If this wasn't you, please contact support.",
          req.app.get('io')
        ).catch(err => console.error("Notification Error:", err));

        
      // Log Activity
      logActivity(studentId, "Updated account password");
        
        return res.json({ message: "Password updated successfully" });
      }
    );
  });
});

// Update Email
router.put('/update-email/:id', (req, res) => {
  const studentId = req.params.id;
  const { newEmail } = req.body;

  const sql = `
    UPDATE users u
    JOIN students s ON u.student_id = s.student_id
    SET u.email = ?, s.email = ?
    WHERE u.id = ?
  `;

  db.query(sql, [newEmail, newEmail, studentId], (err) => {
    if (err) return res.status(500).json({ message: "Failed to update email" });


     // Send Notification
    notify.sendNotification(
      studentId,
      "Your account email was changed successfully. If this wasn't you, please contact support.",
      req.app.get('io')
    ).catch(err => console.error("Notification Error:", err));

    // Log Activity
    logActivity(studentId, "Updated account email");


    return res.json({ message: "Email updated successfully" });
  });
});



// Update Student Profile
router.put('/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, phone, address } = req.body;

  const sql = `
    UPDATE students s
    JOIN users u ON s.student_id = u.student_id
    SET s.name = ?, s.phone = ?, s.address = ?, u.name = ?
    WHERE u.id = ?
  `;

  db.query(sql, [name, phone, address, name, studentId], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to update profile" });

    // Log Activity
    logActivity(studentId, "Updated profile information");
    return res.json({ message: "Profile updated successfully" });
  });
});


module.exports = router;
