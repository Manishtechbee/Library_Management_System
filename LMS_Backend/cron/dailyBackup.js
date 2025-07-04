const cron = require("node-cron");
const { createBackup } = require("../utils/backupUtils");

cron.schedule("0 2 * * *", () => { // Runs daily at 2:00 AM
  createBackup((err, fileName) => {
    if (err) console.error("Daily Backup Failed:", err.message);
    else console.log("✅ Daily Backup Created:", fileName);
  });
});
