const db = require("../config/db");

exports.getIssuedBooksByStudent = (req, res) => {
  const studentId = req.params.studentId;

  const sql = `
    SELECT ib.id, b.title, b.author, ib.issueDate, ib.returnDate, ib.status 
    FROM issued_books ib
    JOIN books b ON ib.bookId = b.id
    WHERE ib.studentId = ?
    ORDER BY ib.issueDate DESC
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
    res.json(results);
  });
};
