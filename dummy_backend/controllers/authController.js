const crypto = require('crypto');
const db = require('../config/db');
const { sendResetEmail } = require('../utils/sendEmail');
//Password reset forget functionality

exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const sql = 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
    db.query(sql, [token, expiry, email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Email not found' });

        const resetLink = `http://localhost:5173/reset-password/${token}`;

        sendResetEmail(email, resetLink)
            .then(() => res.json({ message: 'Password reset link sent to email' }))
            .catch(() => res.status(500).json({ error: 'Failed to send email' }));
    });
};
const bcrypt = require('bcrypt');

exports.resetPassword = (req, res) => {
    const { token, newPassword } = req.body;

    const sql = 'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()';
    db.query(sql, [token], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid or expired token' });

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?';

        db.query(updateSql, [hashedPassword, results[0].id], (err) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json({ message: 'Password successfully reset' });
        });
    });
};

const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "All fields required" });
  }

  userModel.getUserByEmail(email, (err, result) => {
    if (result.length > 0) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { name, email, password: hashedPassword, role };

    userModel.createUser(newUser, (err, result) => {
      if (err) throw err;
      res.json({ msg: "Registration successful" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, result) => {
    if (result.length === 0) return res.status(400).json({ msg: "Invalid credentials" });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: pwd, ...userData } = user;
    res.json({ msg: "Login successful", token, user: userData });
  });
};


