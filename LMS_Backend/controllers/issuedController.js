{/*const db = require("../config/db");

exports.getIssuedBooks = (req, res, userId) => {
  const query = `
    SELECT bb.id, b.title, b.author, bb.borrowed_date AS issueDate, bb.due_date AS dueDate, 
           bb.returned_date IS NOT NULL AS returned, bb.renewal_requested AS renewalRequested
    FROM borrowed_books bb
    JOIN books b ON b.id = bb.copy_id
    WHERE bb.user_id = ?
    ORDER BY bb.due_date ASC
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

exports.requestRenewal = (req, res) => {
  const id = req.params.id;
  const query = "UPDATE borrowed_books SET renewal_requested = TRUE WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Renewal requested successfully" });
  });
};

exports.markReturned = (req, res) => {
  const id = req.params.id;
  const query = "UPDATE borrowed_books SET returned_date = CURRENT_DATE WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Book marked as returned" });
  });
};
*/}


const db = require("../config/db");

exports.getIssuedBooks = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
      bb.id AS borrow_id, 
      b.title, 
      b.author, 
      bb.borrowed_date, 
      bb.due_date, 
      bb.returned_date,
      bb.copy_id
    FROM borrowed_books bb
    JOIN books b ON bb.book_id = b.id
    WHERE bb.user_id = ?
    ORDER BY bb.borrowed_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching issued books:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};
