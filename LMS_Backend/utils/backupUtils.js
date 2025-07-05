const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const config = require("../config/backupConfig");

exports.createBackup = (callback) => {
  const fileName = `backup-${Date.now()}.sql`;
  const filePath = path.join(config.backupFolder, fileName);

  // Construct mysqldump command (ensure correct credentials)
  const cmd = `mysqldump -u ${config.dbUser} -p${config.dbPassword} ${config.dbName} > "${filePath}"`;

  exec(cmd, (err) => {
    if (err) return callback(err);
    callback(null, fileName);
  });
};

exports.getBackupList = () => {
  return fs.readdirSync(config.backupFolder).filter(f => f.endsWith(".sql"));
};

exports.restoreBackup = (fileName, callback) => {
  const filePath = path.join(config.backupFolder, fileName);
  if (!fs.existsSync(filePath)) return callback(new Error("Backup file not found"));

  const cmd = `mysql -u ${config.dbUser} -p${config.dbPassword} ${config.dbName} < "${filePath}"`;

  exec(cmd, (err) => {
    if (err) return callback(err);
    callback(null);
  });
};
