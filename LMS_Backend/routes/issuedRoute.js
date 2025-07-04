const express = require("express");
const router = express.Router();
const issuedController = require("../controllers/issuedController");

// Fetch issued books for user (replace 1 with real userId from auth in real app)
//router.get("/", (req, res) => issuedBooksController.getIssuedBooks(req, res, 1));
// Fetch issued books for a specific user
router.get("/:userId", issuedController.getIssuedBooks);{/*
router.post("/request-renewal/:id", issuedBooksController.requestRenewal);
router.post("/mark-returned/:id", issuedBooksController.markReturned);*/}

module.exports = router;


