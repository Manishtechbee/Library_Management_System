const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch recommendations for a specific faculty
router.get('/recommended-books/:facultyId', (req, res) => {
  const { facultyId } = req.params;

  const sql = 'SELECT * FROM recommended_books WHERE facultyId = ? ORDER BY createdAt DESC';
  db.query(sql, [facultyId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    console.log(results);
    res.json(results);
  });
});

// Recommend a new book
router.post('/recommend-book', (req, res) => {
  const { facultyId, title, author, publisher, category, description, copies } = req.body;

  if (!facultyId || !title || !author || !publisher || !category || !copies) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  const sql = `
    INSERT INTO recommended_books (facultyId, title, author, publisher, category, description, copies)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [facultyId, title, author, publisher, category, description, copies], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ success: true, message: 'Book recommended successfully' });
  });
});




// Approve or Reject a recommendation
router.put('/admin/recommendation/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expected 'Approved' or 'Rejected'

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const updateSql = 'UPDATE recommended_books SET status = ? WHERE id = ?';
  db.query(updateSql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (status === 'Approved') {
      // If approved, insert into books & other tables
      const fetchSql = 'SELECT * FROM recommended_books WHERE id = ?';
      db.query(fetchSql, [id], (err, recResults) => {
        if (err || recResults.length === 0) return res.status(500).json({ message: 'Failed to fetch recommendation' });

        const rec = recResults[0];

        // First, handle publisher
        const publisherSql = 'INSERT INTO publishers (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
        db.query(publisherSql, [rec.publisher], (err, pubResult) => {
          if (err) return res.status(500).json({ message: 'Publisher insert failed' });

          const publisherId = pubResult.insertId;

          // Handle category
          const categorySql = 'INSERT INTO categories (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
          db.query(categorySql, [rec.category], (err, catResult) => {
            if (err) return res.status(500).json({ message: 'Category insert failed' });

            const categoryId = catResult.insertId;

            // Insert into books table
            const bookSql = `
              INSERT INTO books (title, author, publisher_id, category_id, description, created_at)
              VALUES (?, ?, ?, ?, ?, NOW())
            `;
            db.query(bookSql, [rec.title, rec.author, publisherId, categoryId, rec.description], (err, bookResult) => {
              if (err) return res.status(500).json({ message: 'Book insert failed' });

              const bookId = bookResult.insertId;

              // Insert book copies
              const copiesSql = `
                INSERT INTO book_copies (book_id, copy_number, availability_status, status)
                VALUES ?
              `;

              const copiesData = [];
              for (let i = 1; i <= rec.copies; i++) {
                copiesData.push([bookId, i, 'available', 'available']);
              }

              db.query(copiesSql, [copiesData], (err) => {
                if (err) return res.status(500).json({ message: 'Book copies insert failed' });

                return res.json({ success: true, message: 'Recommendation approved and book added successfully' });
              });
            });
          });
        });
      });
    } else {
      return res.json({ success: true, message: 'Recommendation rejected' });
    }
  });
});


module.exports = router;
