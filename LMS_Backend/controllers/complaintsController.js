const db = require("../config/db");
const nodemailer = require("nodemailer");

// Fetch all complaints
exports.getAllComplaints = (req, res) => {
  const sql = `
    SELECT c.*, u.name as user_name 
    FROM complaints c 
    LEFT JOIN users u ON c.user_id = u.id 
    ORDER BY c.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Submit complaint (for students)
exports.submitComplaint = (req, res) => {
  const { user_id, subject, description } = req.body;
  if (!user_id || !subject || !description)
    return res.status(400).json({ message: "All fields are required" });

  const sql = `INSERT INTO complaints (user_id, subject, description) VALUES (?, ?, ?)`;
  db.query(sql, [user_id, subject, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: "Complaint submitted successfully" });
  });
};

// Delete complaint (admin)
exports.deleteComplaint = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM complaints WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Complaint deleted successfully" });
  });
};

// Mark as resolved with email (admin)
exports.markAsResolved = (req, res) => {
  const { id } = req.params;

  const fetchSql = `SELECT c.*, u.email FROM complaints c JOIN users u ON c.user_id = u.id WHERE c.id = ?`;
  db.query(fetchSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Complaint not found" });

    const userEmail = results[0].email;

    const updateSql = `UPDATE complaints SET status = 'Resolved' WHERE id = ?`;
    db.query(updateSql, [id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: updateErr });

      // Send Email (Make sure EMAIL_USER & EMAIL_PASS are set in env)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Your Complaint Has Been Resolved",
        text: "Dear User,\n\nYour recent complaint has been marked as resolved.\n\nThank you for your patience."
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email Error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.json({ message: "Complaint marked as resolved and user notified" });
    });
  });
};
