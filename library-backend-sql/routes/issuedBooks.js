const express = require("express");
const router = express.Router();
const { getIssuedBooksByStudent } = require("../controllers/issuedBooksController");

router.get("/issued-books/:studentId", getIssuedBooksByStudent);

module.exports = router;
