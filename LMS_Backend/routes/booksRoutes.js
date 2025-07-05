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
      SUM(CASE WHEN bc.status = 'borrowed' THEN 1 ELSE 0 END) AS borrowed_copies,
      b.ebook_link,
      CASE 
        WHEN SUM(CASE WHEN bc.status = 'available' THEN 1 ELSE 0 END) = 0 THEN 'Not Available'
        ELSE 'Available'
      END AS book_status
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



// Add new book
router.post("/add", (req, res) => {
  console.log(req.body);
  const {
    title, author, categoryId, publisherId,
    edition, year, language, description, ebookLink, totalCopies
  } = req.body;

  let coverImagePath = null;
  if (req.files?.coverImage) {
    const image = req.files.coverImage;
    const fileName = Date.now() + "_" + image.name;
    const uploadPath = path.join(__dirname, "../uploads/", fileName);
    image.mv(uploadPath);
    coverImagePath = "/uploads/" + fileName;
  }

  const bookSql = `
    INSERT INTO books 
    (title, author, category_id, publisher_id, edition, publication_year, language, description, cover_image, ebook_link) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(bookSql, [
    title, author, categoryId, publisherId, edition, year, language, description, coverImagePath, ebookLink
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const bookId = result.insertId;
    const copiesSql = "INSERT INTO book_copies (book_id, copy_number, status) VALUES ?";
    const copiesValues = Array.from({ length: totalCopies }, (_, i) => [bookId, i + 1, "available"]);

    db.query(copiesSql, [copiesValues], (copyErr) => {
      if (copyErr) return res.status(500).json({ error: copyErr });
      res.json({ message: "Book added successfully" });
    });
  });
});

// Delete Book (only if all copies available)
router.delete("/:id", (req, res) => {
  const bookId = req.params.id;

  const checkSql = `
    SELECT COUNT(*) AS borrowed 
    FROM book_copies 
    WHERE book_id = ? AND status != 'available'
  `;
  db.query(checkSql, [bookId], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result[0].borrowed > 0) {
      return res.status(400).json({ message: "Cannot delete. Some copies are borrowed, lost, or damaged." });
    }

    db.query("DELETE FROM book_copies WHERE book_id = ?", [bookId], () => {
      db.query("DELETE FROM books WHERE id = ?", [bookId], (delErr) => {
        if (delErr) return res.status(500).json({ error: delErr });
        res.json({ message: "Book deleted successfully" });
      });
    });
  });
});




router.put("/:id", (req, res) => {
  const bookId = req.params.id;
  const {
    title, author, edition, year, language, description, ebookLink, totalCopies
  } = req.body;

  

  let coverImagePath = null;
  if (req.files?.coverImage) {
    const image = req.files.coverImage;
    const fileName = Date.now() + "_" + image.name;
    const uploadPath = path.join(__dirname, "../uploads/", fileName);
    image.mv(uploadPath);
    coverImagePath = "/uploads/" + fileName;
  }

  const updateSql = `
    UPDATE books SET
    title = ?, author = ?, edition = ?, publication_year = ?, language = ?, description = ?, ebook_link = ?
    ${coverImagePath ? ", cover_image = ?" : ""}
    WHERE id = ?
  `;

  const params = [title, author, edition, year, language, description, ebookLink];
  if (coverImagePath) params.push(coverImagePath);
  params.push(bookId);

  db.query(updateSql, params, (err) => {
    if (err) return res.status(500).json({ error: err });

    const copiesSql = `UPDATE book_copies SET status = 'available' WHERE book_id = ?`;
    db.query(copiesSql, [bookId], (copyErr) => {
      if (copyErr) return res.status(500).json({ error: copyErr });
      res.json({ message: "Book updated successfully" });
    });
  });
});

module.exports = router;
