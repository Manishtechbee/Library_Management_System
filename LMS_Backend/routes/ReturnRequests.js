const router = require("./SettingsUpdate");
const db = require("../config/db");
const logActivity = require("../utils/logActivity");

router.put("/return/:borrowedId", (req, res) => {
  const { borrowedId } = req.params;

  // Step 1: Fetch borrowed book details
  const fetchSql = `SELECT * FROM borrowed_books WHERE id = ? `;
  db.query(fetchSql, [borrowedId], (err, results) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: "Failed to fetch borrowed book" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Borrowed book not found" });
    }

    const { book_id, copy_id, user_id, borrowed_date, due_date } = results[0];

    // Step 2: Mark as returned in borrowed_books
    const updateBorrowedSql = `UPDATE borrowed_books SET returned_date = NOW() WHERE id = ?`;
    db.query(updateBorrowedSql, [borrowedId], (err) => {
      if (err) {
        console.error("Borrowed Book Update Error:", err);
        return res.status(500).json({ error: "Failed to update borrowed book" });
      }

      // Step 3: Mark copy as available and increment available_copies
      const updateCopySql = `
        UPDATE book_copies 
        SET status = 'available', available_copies = available_copies + 1
        WHERE id = ?
      `;
      db.query(updateCopySql, [copy_id], (err) => {
        if (err) {
          console.error("Book Copy Update Error:", err);
          return res.status(500).json({ error: "Failed to update book copy" });
        }

        // Step 4: Check if already in returned_books
        const checkReturnedSql = `
          SELECT * FROM returned_books WHERE book_id = ? AND copy_id = ? AND user_id = ?
        `;
        db.query(checkReturnedSql, [book_id, copy_id, user_id], (err, returnedResults) => {
          if (err) {
            console.error("Check Returned Error:", err);
            return res.status(500).json({ error: "Failed to check returned books" });
          }

          if (returnedResults.length > 0) {
            return res.json({ message: "Book returned successfully (already recorded earlier)" });
          }

          // Step 5: Insert into returned_books if not already present
          const insertSql = `
            INSERT INTO returned_books (book_id, copy_id, user_id, borrowed_date, due_date, returned_date, status)
            VALUES (?, ?, ?, ?, ?, NOW(), 'returned')
          `;
          db.query(insertSql, [book_id, copy_id, user_id, borrowed_date, due_date], (err) => {
            if (err) {
              console.error("Returned Book Insert Error:", err);
              return res.status(500).json({ error: "Failed to insert returned book" });
            }


             logActivity(user_id, "Returned a book");
            return res.json({ message: "Book returned successfully" });
          });
        });
      });
    });
  });
});


router.post("/request-renewal/:borrowedId", (req, res) => {
  const { borrowedId } = req.params;
  const userId = req.body.user_id;

  const checkSql = `SELECT * FROM borrowed_books WHERE id = ? AND returned_date IS NULL`;
  db.query(checkSql, [borrowedId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Borrowed book not found or already returned" });

    const insertSql = `
      INSERT INTO renewals (borrowed_book_id, user_id, requested_date, status)
      VALUES (?, ?, NOW(), 'pending')
    `;
    db.query(insertSql, [borrowedId, userId], (err) => {
      if (err) {
        console.error("Renewal Insert Error:", err);
        return res.status(500).json({ error: "Failed to request renewal" });
      }


      logActivity(userId, "Requested book renewal");
      return res.json({ message: "Renewal requested successfully" });
    });
  });
});


router.put("/renewal/:renewalId", (req, res) => {
  const { renewalId } = req.params;
  const { status } = req.body; // approved or rejected

  if (!["approved", "rejected"].includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const fetchSql = `
    SELECT r.*, b.due_date
    FROM renewals r
    JOIN borrowed_books b ON r.borrowed_book_id = b.id
    WHERE r.id = ?
  `;
  db.query(fetchSql, [renewalId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Renewal request not found" });

    const { borrowed_book_id, due_date } = results[0];

    if (status === "approved") {
      const newDueDate = new Date(due_date);
      newDueDate.setDate(newDueDate.getDate() + 15); // Example: 15 days extension

      const updateBorrowedSql = `UPDATE borrowed_books SET due_date = ? WHERE id = ?`;
      db.query(updateBorrowedSql, [newDueDate, borrowed_book_id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to update due date" });

        const updateRenewalSql = `
          UPDATE renewals SET status = 'approved', approved_date = NOW(), new_due_date = ? WHERE id = ?
        `;
        db.query(updateRenewalSql, [newDueDate, renewalId], (err) => {
          if (err) return res.status(500).json({ error: "Failed to update renewal status" });
          
          logActivity(user_id, "Renewal approved");
          return res.json({ message: "Renewal approved successfully" });
        });
      });
    } else {
      const rejectSql = `UPDATE renewals SET status = 'rejected' WHERE id = ?`;
      db.query(rejectSql, [renewalId], (err) => {
        if (err) return res.status(500).json({ error: "Failed to reject renewal" });

        logActivity(user_id, "Renewal rejected");
        return res.json({ message: "Renewal rejected successfully" });
      });
    }
  });
});


module.exports = router;
