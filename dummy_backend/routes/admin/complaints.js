const express = require("express");
const router = express.Router();
const complaintsController = require("../../controllers/complaintsController");

// Get all complaints
router.get("/", complaintsController.getAllComplaints);

// Mark as resolved
router.put("/:id", complaintsController.markAsResolved);

// Delete complaint
router.delete("/:id", complaintsController.deleteComplaint);

module.exports = router;
