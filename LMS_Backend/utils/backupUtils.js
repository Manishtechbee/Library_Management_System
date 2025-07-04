const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const config = require("../config/backupConfig");

exports.createBackup = (callback) => {
  const fileName = `backup-${Date.now()}.sql`;
  const filePath = path.join(config.backupFolder, fileName);

  const command = `mysqldump -u ${config.dbUser} -p${config.dbPassword} ${config.dbName} > ${filePath}`;
  
  exec(command, (err) => {
    if (err) return callback(err);
    callback(null, fileName);
  });
};

exports.getBackupList = () => {
  return fs.readdirSync(config.backupFolder).map(file => {
    const stats = fs.statSync(path.join(config.backupFolder, file));
    return {
      file,
      sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      created: stats.birthtime,
    };
  });
};

exports.restoreBackup = (fileName, callback) => {
  const filePath = path.join(config.backupFolder, fileName);
  
  if (!fs.existsSync(filePath)) return callback(new Error("Backup file not found"));

  const command = `mysql -u ${config.dbUser} -p${config.dbPassword} ${config.dbName} < ${filePath}`;
  
  exec(command, (err) => {
    if (err) return callback(err);
    callback(null);
  });
};
