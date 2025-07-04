const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);



const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

// Register Route
// Register Route with student_id from students table
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    // 1. Find student_id from students table by matching name and email
    const findStudentQuery = 'SELECT student_id FROM students WHERE name = ? AND email = ?';
    db.query(findStudentQuery, [name, email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Student record not found. Please contact admin.' });
      }

      const studentId = results[0].student_id;

      // 2. Hash password and insert into users table
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO users (student_id, name, email, password, role) VALUES (?, ?, ?, ?, ?)';

      db.query(insertQuery, [studentId, name, email, hashedPassword, 'student'], (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY')
            return res.status(409).json({ message: 'Email already registered' });
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }

        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});


// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) {
      
      return res.status(500).json({ message: 'Server error' });}

    if (results.length === 0){
      return res.status(401).json({ message: 'Invalid email or password' });}

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
      return res.status(401).json({ message: 'Invalid email or password' });}

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  });
});




module.exports=router