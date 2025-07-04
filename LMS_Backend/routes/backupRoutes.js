const express = require("express");
const router = express.Router();
const backupController = require("../controllers/backupController");

router.post("/trigger", backupController.triggerBackup);
router.get("/list", backupController.listBackups);
router.get("/download/:file", backupController.downloadBackup);
router.post("/restore", backupController.restoreFromBackup);

module.exports = router;
