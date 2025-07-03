const express = require("express");
const router = express.Router();
const db = require("../config/db");
const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

router.put("/:id/return", (req, res) => {
  const { id } = req.params;
  const returnedDate = new Date();

  const sql = `UPDATE borrowed_books SET returned_date = ? WHERE id = ?`;

  db.query(sql, [returnedDate, id], (err) => {
    if (err) {
      console.error("Return Update Error:", err);
      return res.status(500).json({ error: "Failed to mark as returned" });
    }

    res.json({ message: "Book marked as returned successfully" });
  });
});

module.exports = router;
