const db = require('../config/db');

exports.getUsers = (req, res) => {
    console.log("hi");
  const sql = `
    SELECT 
  u.id, 
  u.name, 
  u.email, 
  s.phone,
  s.address,
  u.student_id,
  u.role,
  u.dark_mode,
  s.profileImage,
  s.designation, 
  s.department, 
  s.year
FROM users u
LEFT JOIN students s ON u.student_id = s.student_id
where u.role!="librarian"
ORDER BY u.created_at DESC;

  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json(results);
  });
};
exports.getLib = (req, res) => {
    console.log("hi");
  const sql = `
    SELECT 
  u.id, 
  u.name, 
  u.email, 
  s.phone,
  s.address,
  u.student_id,
  u.role,
  u.dark_mode,
  s.profileImage,
  s.designation, 
  s.department, 
  s.year
FROM users u
LEFT JOIN students s ON u.student_id = s.student_id
where u.role="librarian"
ORDER BY u.created_at DESC;

  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json(results);
  });
};

exports.updateRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  db.query("UPDATE users SET role = ? WHERE id = ?", [role, id], (err) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json({ message: 'Role updated' });
  });
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query("UPDATE users SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json({ message: 'Status updated' });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  // Check for unreturned books
  const checkBooksQuery = `
    SELECT COUNT(*) AS unreturnedCount
    FROM borrowed_books
    WHERE user_id = ? AND returned_date IS NULL
  `;

  // Check for unpaid fines
  const checkFinesQuery = `
    SELECT COUNT(*) AS unpaidFines
    FROM fines
    WHERE user_id = ? AND paid = 0
  `;

  db.query(checkBooksQuery, [id], (err, bookResults) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    

    if (bookResults[0].unreturnedCount > 0) {
      console.log("hell");
    }
    db.query(checkFinesQuery, [id], (err, fineResults) => {
      if (err) return res.status(500).json({ message: 'Server Error' });
      

      if (fineResults[0].unpaidFines > 0) {
        return res.status(400).json({ message: 'User has unpaid fines. Cannot delete.' });
      }

      // Step 1: Delete dependent records in order
      const deleteBorrowedBooks = `DELETE FROM borrowed_books WHERE user_id = ?`;
      const deleteReturnedBooks = `DELETE FROM returned_books WHERE user_id = ?`;
      const deleteFines = `DELETE FROM fines WHERE user_id = ?`;
      const deleteIssueRequests = `DELETE FROM issue_requests WHERE user_id = ?`;
      const deleteRenewalRequests = `DELETE FROM renewals WHERE user_id = ?`;
      const deleteNoDuesRequests = `
        DELETE FROM no_dues
        WHERE student_id = (SELECT student_id FROM users WHERE id = ?)
      `;
db.query(deleteRenewalRequests, [id], (err) => {
                if (err) return res.status(500).json({ message: 'Server Error while deleting renewal requests.' });
                

      db.query(deleteBorrowedBooks, [id], (err) => {
        if (err) return res.status(500).json({ message: 'Server Error while deleting borrowed books.' });

        db.query(deleteReturnedBooks, [id], (err) => {
          if (err) return res.status(500).json({ message: 'Server Error while deleting returned books.' });

          db.query(deleteFines, [id], (err) => {
            if (err) return res.status(500).json({ message: 'Server Error while deleting fines.' });

            db.query(deleteIssueRequests, [id], (err) => {
              if (err) return res.status(500).json({ message: 'Server Error while deleting issue requests.' });

              
                db.query(deleteNoDuesRequests, [id], (err) => {
                  if (err) return res.status(500).json({ message: 'Server Error while deleting no dues requests.' });

                  // Step 2: Delete the user
                  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
                    if (err) return res.status(500).json({ message: 'Server Error while deleting user.' });
                    console.log("done");
                    res.json({ message: 'User and related data deleted successfully.' });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

