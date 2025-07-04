const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/admin/backup", adminController.createBackup);
router.get("/admin/backups", adminController.listBackups);
router.get("/admin/download-backup", adminController.downloadBackup);
router.delete("/admin/clear-activity", adminController.clearActivityLogs);

module.exports = router;
