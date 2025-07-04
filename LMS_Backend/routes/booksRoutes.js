const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET All Books with Category & Publisher
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      b.id,
      b.title,
      b.author,
      c.name AS category,
      p.name AS publisher,
      b.edition,
      b.publication_year,
      b.language,
      b.description,
      b.cover_image,
      COUNT(bc.id) AS total_copies,
      SUM(CASE WHEN bc.status = 'available' THEN 1 ELSE 0 END) AS available_copies,
      b.ebook_link
    FROM books b
    LEFT JOIN categories c ON b.category_id = c.id
    LEFT JOIN publishers p ON b.publisher_id = p.id
    LEFT JOIN book_copies bc ON b.id = bc.book_id
    GROUP BY b.id
  `;


  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Add random image for each book using Lorem Picsum (can change to Unsplash later)
    const booksWithImages = results.map(book => ({
      ...book,
      cover_image: `https://source.unsplash.com/200x300/?book,library,reading`

    }));

    res.json(booksWithImages);
  });
});

module.exports = router;
