const { createBackup, getBackupList, restoreBackup } = require("../utils/backupUtils");
const config = require("../config/backupConfig");
const path = require("path");

exports.triggerBackup = (req, res) => {
  const { password } = req.body;
  if (password !== config.password) return res.status(403).json({ message: "Invalid password" });

  createBackup((err, fileName) => {
    if (err) return res.status(500).json({ message: "Backup failed" });
    res.json({ message: "Backup created", fileName });
  });
};

exports.listBackups = (req, res) => {
  res.json(getBackupList());
};

exports.downloadBackup = (req, res) => {
  const { file } = req.params;
  const filePath = path.join(config.backupFolder, file);
  if (!filePath.startsWith(path.resolve(config.backupFolder))) return res.status(400).json({ message: "Invalid file" });

  res.download(filePath);
};

exports.restoreFromBackup = (req, res) => {
  const { file, password } = req.body;
  if (password !== config.password) return res.status(403).json({ message: "Invalid password" });

  restoreBackup(file, (err) => {
    if (err) return res.status(500).json({ message: "Restore failed" });
    res.json({ message: "Database restored successfully" });
  });
};
