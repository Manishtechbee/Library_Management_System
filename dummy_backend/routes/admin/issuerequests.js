const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// Fetch all Issue Requests with Student & Book Details
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      ir.id, ir.status, ir.request_date,
      s.name AS student_name, s.student_id,
      b.title AS book_title
    FROM issue_requests ir
    JOIN users u ON ir.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    JOIN books b ON ir.book_id = b.id
    ORDER BY ir.request_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Approve/Reject Issue Request
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status))
    return res.status(400).json({ message: "Invalid status value" });

  const fetchSql = `SELECT * FROM issue_requests WHERE id = ?`;
  db.query(fetchSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch request" });
    if (results.length === 0) return res.status(404).json({ message: "Request not found" });

    const { book_id, user_id } = results[0];

    const updateSql = `UPDATE issue_requests SET status = ? WHERE id = ?`;
    db.query(updateSql, [status, id], (err) => {
      if (err) return res.status(500).json({ error: "Failed to update status" });

      if (status === "approved") {
        // Find first available copy
        const findCopySql = `
          SELECT id, copy_number FROM book_copies 
          WHERE book_id = ? AND status = 'available' 
          ORDER BY copy_number ASC 
          LIMIT 1
        `;
        db.query(findCopySql, [book_id], (err, copyResults) => {
          if (err) return res.status(500).json({ error: "Failed to fetch book copy" });
          if (copyResults.length === 0) return res.status(400).json({ message: "No available copies left" });

          const { id: copyId, copy_number } = copyResults[0];

          const borrowed_date = new Date();
          const due_date = new Date();
          due_date.setDate(due_date.getDate() + 15);

          const insertBorrowSql = `
            INSERT INTO borrowed_books (book_id, user_id, borrowed_date, due_date, copy_id)
            VALUES (?, ?, ?, ?, ?)
          `;
          db.query(insertBorrowSql, [book_id, user_id, borrowed_date, due_date, copyId], (err) => {
            if (err) return res.status(500).json({ error: "Failed to insert into borrowed_books" });

            // Mark the copy as 'not available'
            const updateCopySql = `UPDATE book_copies SET status = 'not available' WHERE id = ?`;
            db.query(updateCopySql, [copyId], (err) => {
              if (err) return res.status(500).json({ error: "Failed to update book copy status" });

              // Decrement available_copies count
              const decrementSql = `
                UPDATE book_copies 
                SET available_copies = available_copies - 1 
                WHERE book_id = ?
              `;
              db.query(decrementSql, [book_id], (err) => {
                if (err) return res.status(500).json({ error: "Failed to update available copies count" });

                return res.json({ message: "Request approved, book issued, and book copy updated successfully" });
              });
            });
          });
        });
      } else {
        return res.json({ message: "Request rejected successfully" });
      }
    });
  });
});


module.exports = router;
