const db = require("../config/db");
const { generatePDFReport, generateExcelReport } = require("../utils/reportGenerator");
const path = require("path");
const fs= require("fs");

// Fetch Stats
exports.getStats = (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM books) AS totalBooks,
      (SELECT COUNT(*) FROM users WHERE role='student' OR role='faculty') AS totalUsers,
      (SELECT COUNT(*) FROM borrowed_books WHERE returned_date IS NULL) AS issuedBooks,
      (SELECT COUNT(*) FROM borrowed_books WHERE due_date < CURDATE() AND returned_date IS NULL) AS overdueCount
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(results[0]);
  });
};

// Popular Books (Most issued)
exports.getPopularBooks = (req, res) => {
  const sql = `
    SELECT b.id, b.title, b.author, COUNT(bb.book_id) AS issuedCount
    FROM borrowed_books bb
    JOIN books b ON bb.book_id = b.id
    GROUP BY bb.book_id
    ORDER BY issuedCount DESC
    LIMIT 5
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(results);
  });
};

//Recent Activities

exports.getRecentActivity = (req, res) => {
  const sql = `
    SELECT a.id, u.email AS user_email, u.role, a.activity, a.timestamp
    FROM activity_logs a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.timestamp DESC
    LIMIT 10
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: "DB Error" });
    }
    res.json(results);
  });
};


// Weekly Reports (Based on borrowed_books)
exports.getWeeklyReports = (req, res) => {
  const sql = `
    SELECT 
      
      YEAR(borrowed_date) AS year,
  WEEK(borrowed_date) AS week,
  MIN(borrowed_date) AS week_start,
  MAX(borrowed_date) AS week_end,
      COUNT(*) AS totalIssued,
      COUNT(CASE WHEN returned_date IS NULL AND due_date >= CURDATE() THEN 1 END) AS overdue,
      SUM(CASE WHEN returned_date IS NOT NULL THEN 1 ELSE 0 END) AS returned,
      SUM(CASE WHEN due_date < CURDATE() AND returned_date IS NULL THEN 1 ELSE 0 END) AS issued
    FROM borrowed_books
WHERE borrowed_date IS NOT NULL
GROUP BY year, week
ORDER BY year DESC, week DESC
    LIMIT 4
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(results);
  });
};

// Report Download (PDF/Excel)
exports.downloadReport = (req, res) => {
  const { type, format, startDate, endDate } = req.query;

  if (!["weekly", "monthly", "yearly", "custom"].includes(type) || !["pdf", "excel"].includes(format)) {
    return res.status(400).json({ message: "Invalid parameters" });
  }

  const fileName = `report-${type}-${Date.now()}.${format === "pdf" ? "pdf" : "xlsx"}`;
  const filePath = path.join(__dirname, "../", fileName);

  let sql = "";
  let sqlParams = [];
  
  if (type === "weekly") {
    sql = `
      SELECT YEAR(borrowed_date) AS year, WEEK(borrowed_date) AS week, COUNT(*) AS totalIssued
      FROM borrowed_books
      GROUP BY year, week
      ORDER BY year DESC, week DESC
      LIMIT 10
    `;
  } else if (type === "monthly") {
    sql = `
      SELECT YEAR(borrowed_date) AS year, MONTH(borrowed_date) AS month, COUNT(*) AS totalIssued
      FROM borrowed_books
      GROUP BY year, month
      ORDER BY year DESC, month DESC
      LIMIT 12
    `;
  } else if (type === "yearly") {
    sql = `
      SELECT YEAR(borrowed_date) AS year, COUNT(*) AS totalIssued
      FROM borrowed_books
      GROUP BY year
      ORDER BY year DESC
      LIMIT 5
    `;
  } else if (type === "custom") {
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start and end date required for custom report" });
    }
    sql = `
      SELECT borrowed_date, due_date, returned_date, 
      CASE 
        WHEN returned_date IS NOT NULL THEN 'Returned' 
        WHEN due_date < CURDATE() THEN 'Overdue' 
        ELSE 'Issued' 
      END AS status
      FROM borrowed_books
      WHERE borrowed_date BETWEEN ? AND ?
      ORDER BY borrowed_date DESC
    `;
    sqlParams = [startDate, endDate];
  }

  db.query(sql, sqlParams, (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    const callback = (err) => {
      if (err) return res.status(500).json({ message: "Failed to generate report" });
      res.download(filePath, () => {
        fs.unlinkSync(filePath);
      });
    };

    const meta = type === "custom" ? { startDate, endDate } : {};

    if (format === "pdf") {
      generatePDFReport(type, filePath, results, callback, meta);
    } else {
      generateExcelReport(type, filePath, results, callback, meta);
    }
  });
};



const { exec } = require("child_process");

const backupDir = path.join(__dirname, "../backups");
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

exports.createBackup = (req, res) => {
  const fileName = `backup-${Date.now()}.sql`;
  const filePath = path.join(backupDir, fileName);
  const dumpCommand = `mysqldump -u root -pYourPassword YourDatabase > "${filePath}"`;

  exec(dumpCommand, (err) => {
    if (err) return res.status(500).json({ success: false, message: "Backup failed" });
    res.json({ success: true, fileName });
  });
};

exports.listBackups = (req, res) => {
  fs.readdir(backupDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Failed to list backups" });
    res.json({ files: files.sort().reverse() });
  });
};

exports.downloadBackup = (req, res) => {
  const file = req.query.file;
  if (!file) return res.status(400).json({ message: "File name required" });
  const filePath = path.join(backupDir, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });

  res.download(filePath);
};

exports.clearActivityLogs = (req, res) => {
  db.query("DELETE FROM activity_logs", (err) => {
    if (err) return res.status(500).json({ success: false, message: "Failed to clear logs" });
    res.json({ success: true });
  });
};