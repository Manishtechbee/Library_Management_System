const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const nodemailer = require("nodemailer");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Fetch all No Dues Requests
router.get("/", (req, res) => {
  const sql = `
    SELECT n.*, s.name AS student_name, s.department, s.year, s.student_id, s.email AS student_email
    FROM no_dues n
    JOIN users u ON n.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    ORDER BY n.requested_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Update Request Status with PDF Generation & Email
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("Updating No Dues ID:", id, "to status:", status); // ADD THIS

  if (!["approved", "rejected"].includes(status)){
    console.log("Generating certificate PDF:", filePath);
    return res.status(400).json({ message: "Invalid status" });}

  const fetchSql = `
    SELECT n.*, s.name AS student_name, s.student_id, s.email AS student_email
    FROM no_dues n
    JOIN users u ON n.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    WHERE n.id = ?
  `;

  db.query(fetchSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Request not found" });

    const student = results[0];

    if (status === "approved") {
      const fileName = `${student.student_name}_${student.student_id}.pdf`.replace(/ /g, "_");
      const filePath = path.join(__dirname, "../../uploads/certificates/", fileName);

      generateCertificatePDF(student.student_name, student.student_id, filePath, () => {
        console.log("hi");
        const certificateURL = `/uploads/certificates/${fileName}`;
        console.log(certificateURL);
        const updateSql = `UPDATE no_dues SET status = ?, certificate_url = ? WHERE id = ?`;
        console.log(updateSql);

        db.query(updateSql, [status, certificateURL, id], (err) => {
             console.error("DB Update Error:", err);
          if (err) return res.status(500).json({ error: err });

          sendEmail(student.student_email, status, certificateURL);
           console.log("DB updated, sending response...");
          res.json({ message: "Request approved, certificate generated and student notified" });
        });
      });
    } else {
      const updateSql = `UPDATE no_dues SET status = ? WHERE id = ?`;
      db.query(updateSql, [status, id], (err) => {
        if (err) return res.status(500).json({ error: err });

        sendEmail(student.student_email, status);
        res.json({ message: "Request rejected and student notified" });
      });
    }
  });
});

// Function to Generate PDF Certificate
function generateCertificatePDF(name, studentId, filePath, callback) {
  console.log("Starting PDF generation...");

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);  // You forgot this line previously!

  doc.pipe(stream);

  doc.fontSize(22).text("No Dues Certificate", { align: "center" });
  doc.moveDown(1);
  doc.fontSize(14).text(`This is to certify that the following student has no pending dues as per institutional records:`);
  doc.moveDown(0.5);
  doc.text(`Name: ${name}`);
  doc.text(`Student ID: ${studentId}`);
  doc.moveDown(1);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown(3);
  doc.text("_________________________", { align: "right" });
  doc.text("Authorized Signatory", { align: "right" });

  doc.end();

  // This listens for the PDF file to finish writing
  stream.on("finish", () => {
    console.log("PDF generation finished");
    callback();
  });
}


// Function to Send Email
function sendEmail(toEmail, status, certificateURL = "") {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  let message = `Dear Student,\n\nYour No Dues request has been ${status}.`;

  if (status === "approved") {
    message += `\n\nYou can download your certificate from: http://localhost:5000${certificateURL}`;
  }

  message += `\n\nRegards,\nAdmin Team`;

  const mailOptions = {
    from: EMAIL_USER,
    to: toEmail,
    subject: "No Dues Request Status Update",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Email Error:", error);
    else console.log("Email sent:", info.response);
  });
}

module.exports = router;
