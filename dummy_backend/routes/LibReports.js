const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/stats", adminController.getStats);
router.get("/popular-books", adminController.getPopularBooks);
router.get("/recent-activity", adminController.getRecentActivity);
router.get("/weekly-reports", adminController.getWeeklyReports);
router.get("/reports/download", adminController.downloadReport);

module.exports = router;
