const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL connection

const logActivity = require('../utils/logActivity');


// POST: Request issue of a book
router.post('/request-issue', (req, res) => {
  const { book_id, user_id } = req.body;

  if (!book_id || !user_id) {
    return res.status(400).json({ message: 'book_id and user_id are required.' });
  }

  const sql = `
    INSERT INTO issue_requests (book_id, user_id, request_date, status)
    VALUES (?, ?, CURDATE(), 'pending')
  `;

  db.query(sql, [book_id, user_id], (err, result) => {
    if (err) {
      console.error('Error creating issue request:', err);
      return res.status(500).json({ message: 'Server error. Try again later.' });
    }

     // Log Activity
    logActivity(user_id, `Requested For Book Issue: Book ID ${book_id}`);
    return res.status(200).json({ message: 'Issue request submitted successfully.' });
  });
});







// Get All Issue Requests for a User with Book Title
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT ir.id, ir.book_id, ir.request_date, ir.status, b.title AS book_title
        FROM issue_requests ir
        JOIN books b ON ir.book_id = b.id
        WHERE ir.user_id = ?
        ORDER BY ir.request_date DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(results);
    });
});


// Admin: Approve or Reject Request
router.put('/update/:requestId', (req, res) => {
    const requestId = req.params.requestId;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const updateSql = `UPDATE issue_requests SET status = ? WHERE user_id = ?`;
    db.query(updateSql, [status, requestId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        // If approved, insert into borrowed_books with due_date
        if (status === 'approved') {
            const getRequestSql = `SELECT * FROM issue_requests WHERE user_id = ?`;
            db.query(getRequestSql, [requestId], (err, rows) => {
                if (err || !rows.length) return;

                const { user_id, book_id } = rows[0];

                // Example: Setting due date to 15 days from today
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + 15);
                const formattedDueDate = dueDate.toISOString().split('T')[0];

                const insertBorrowSql = `INSERT INTO borrowed_books (user_id, book_id, due_date) VALUES (?, ?, ?)`;

                db.query(insertBorrowSql, [user_id, book_id, formattedDueDate], (err) => {
                    if (err) console.error('Error inserting into borrowed_books:', err);
                });
            });
        }

        res.json({ message: `Request ${status}` });
    });
});


module.exports = router;
