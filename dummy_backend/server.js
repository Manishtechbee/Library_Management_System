require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});
const notify = require('./controllers/notificationController');


// Cron Job: Generate Daily Fines
cron.schedule("0 9 * * *", () => {
  console.log("Running daily fine generation...");

  const sql = `
   INSERT INTO fines (user_id, fine_amount, reason, issued_date, paid)
SELECT 
  bb.user_id,
  DATEDIFF(CURDATE(), bb.due_date) * 10 AS fine_amount,
  CONCAT('Overdue book: ', b.title) AS reason,
  bb.borrowed_date AS issued_date,
  0 AS paid
FROM borrowed_books bb
JOIN books b ON bb.book_id = b.id
WHERE bb.returned_date IS NULL 
  AND bb.due_date < CURDATE()
  AND NOT EXISTS (
    SELECT 1 FROM fines f 
    WHERE f.user_id = bb.user_id 
      AND f.reason = CONCAT('Overdue book: ', b.title) 
      AND f.issued_date = bb.borrowed_date
  )



  `;
  

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Daily fine generation error:", err);
    } else {
      console.log(`Daily fines generated: ${result.affectedRows} new records.`);

      // Send notifications to affected users
      const fetchUsersSql = `
        SELECT DISTINCT bb.user_id, b.title
        FROM borrowed_books bb
        JOIN books b ON bb.book_id = b.id
        WHERE bb.returned_date IS NULL AND bb.due_date < CURDATE()
      `;

      db.query(fetchUsersSql, (err, rows) => {
        if (err) return console.error("Notification Fetch Error:", err);

        rows.forEach(record => {
          notify.sendNotification(
            record.user_id,
            `A fine has been applied for overdue book: ${record.title}`,
            io
          ).catch(err => console.error("Notification Error:", err));
        });
      });
  
    }
  });


});


// Run every day at 9 AM
cron.schedule("31 17 * * *", () => {
  console.log("Running overdue reminder job...");

  const sql = `
    SELECT bb.user_id ,bb.id, s.email AS student_email, s.name AS student_name, b.title AS book_title, bb.due_date
    FROM borrowed_books bb
    JOIN users u ON bb.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    JOIN books b ON bb.book_id = b.id
    WHERE bb.returned_date IS NULL AND bb.due_date < CURDATE()
  `;

  db.query(sql, (err, results) => {
    if (err) return console.error("DB Error:", err);

    results.forEach(record => {
      const mailOptions = {
        from: EMAIL_USER,
        to: record.student_email,
        subject: "Library Book Overdue Reminder",
        text: `Dear ${record.student_name},

This is a reminder that the book titled "${record.book_title}" was due on ${new Date(record.due_date).toLocaleDateString()}.

Please return it as soon as possible to avoid further penalties.

Regards,
Library Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error("Email Error:", error);
        else {
          console.log(`Reminder sent to ${record.student_email}`);
        }

      });
      // Send In-App Notification
      notify.sendNotification(
        record.user_id,
        `Reminder: Your book "${record.book_title}" is overdue. Please return it as soon as possible.`,
        io
      ).catch(err => console.error("In-App Notification Error:", err));

       

    });
  });
});


// Run every day at 9 AM
cron.schedule("0 9 * * *", () => {
  console.log("Running due soon reminder job...");

  const sql = `
    SELECT bb.user_id, s.email AS student_email, s.name AS student_name, b.title AS book_title, bb.due_date
    FROM borrowed_books bb
    JOIN users u ON bb.user_id = u.id
    JOIN students s ON u.student_id = s.student_id
    JOIN books b ON bb.book_id = b.id
    WHERE bb.returned_date IS NULL 
      AND bb.due_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 3 DAY)
  `;

  db.query(sql, (err, results) => {
    if (err) return console.error("DB Error:", err);

    results.forEach(record => {
      const mailOptions = {
        from: EMAIL_USER,
        to: record.student_email,
        subject: "Library Book Due Soon Reminder",
        text: `Dear ${record.student_name},

This is a friendly reminder that the book titled "${record.book_title}" is due on ${new Date(record.due_date).toLocaleDateString()}.

Please make sure to return it on time to avoid any fines.

Regards,
Library Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error("Email Error:", error);
        else console.log(`Due soon reminder sent to ${record.student_email}`);
      });

      // Send In-App Notification
      notify.sendNotification(
        record.user_id,
        `Reminder: Your book "${record.book_title}" is due on ${new Date(record.due_date).toLocaleDateString()}. Please return it on time to avoid fines.`,
        io
      ).catch(err => console.error("In-App Notification Error:", err));
    });
  });
});


cron.schedule("0 9 * * *", () => {  // Runs daily at 9 AM
  console.log("Running daily resolved complaints notification job...");

  const sql = `
    SELECT c.user_id, c.subject
    FROM complaints c
    WHERE c.status = 'Resolved'
  `;

  db.query(sql, (err, results) => {
    if (err) return console.error("DB Error:", err);

    results.forEach(record => {
      notify.sendNotification(
        record.user_id,
        `Your complaint titled "${record.subject}" has been resolved.`,
        io
      ).then(() => {
        console.log(`Notification sent to user ${record.user_id} for resolved complaint.`);
      }).catch(err => {
        console.error("Notification Error:", err);
      });
    });
  });
});


cron.schedule("0 9 * * *", () => {  // Runs daily at 10 AM
  console.log("Running daily issue request notification job...");

  const sql = `
    SELECT ir.user_id, b.title, ir.status
    FROM issue_requests ir
    JOIN books b ON ir.book_id = b.id
    WHERE ir.status IN ('approved', 'rejected')
  `;

  db.query(sql, (err, results) => {
    if (err) return console.error("DB Error:", err);

    results.forEach(record => {
      let message = '';

      if (record.status === 'approved') {
        message = `Your book issue request for "${record.title}" has been approved. Please collect the book from the library.`;
      } else if (record.status === 'rejected') {
        message = `Your book issue request for "${record.title}" has been rejected. Please contact the library for details.`;
      }

      notify.sendNotification(
        record.user_id,
        message,
        io
      ).then(() => {
        console.log(`Notification sent to user ${record.user_id} for ${record.status} request.`);
      }).catch(err => {
        console.error("Notification Error:", err);
      });
    });
  });
});


cron.schedule("0 9 * * *", () => {  // Runs daily at 11 AM
  console.log("Running daily No Dues notification job...");

  const sql = `
    SELECT nd.student_id, nd.student_name, nd.status
    FROM no_dues nd
    JOIN users u ON nd.student_id = u.student_id
    WHERE nd.status IN ('approved', 'rejected')
  `;

  db.query(sql, (err, results) => {
    if (err) return console.error("DB Error:", err);

    results.forEach(record => {
      let message = '';

      if (record.status === 'approved') {
        message = `Your No Dues request has been approved. You can now access your No Dues certificate.`;
      } else if (record.status === 'rejected') {
        message = `Your No Dues request has been rejected. Please contact the concerned department for clarification.`;
      }

      // Get user's system user_id based on student_id
      const fetchUserIdSql = `SELECT id FROM users WHERE student_id = ?`;

      db.query(fetchUserIdSql, [record.student_id], (err, rows) => {
        if (err) return console.error("User Fetch Error:", err);
        if (rows.length === 0) return console.error(`No user found for student_id ${record.student_id}`);

        const user_id = rows[0].id;

        notify.sendNotification(
          user_id,
          message,
          io
        ).then(() => {
          console.log(`Notification sent to user ${user_id} for No Dues ${record.status} status.`);
        }).catch(err => {
          console.error("Notification Error:", err);
        });
      });
    });
  });
});


// Daily at 11 AM
cron.schedule("0 9 * * *", () => {
  console.log("Running daily renewal status notification job...");

  const sql = `
    SELECT r.user_id, r.status, r.new_due_date, b.title
    FROM renewals r
    JOIN borrowed_books bb ON r.borrowed_book_id = bb.id
    JOIN books b ON bb.book_id = b.id
    WHERE r.status IN ('approved', 'rejected')
  `;

  db.query(sql, (err, results) => {
    if (err) return console.error("DB Error:", err);

    results.forEach(record => {
      let message = "";

      if (record.status === "approved") {
        message = `Your book renewal request for "${record.title}" has been approved. New due date: ${new Date(record.new_due_date).toLocaleDateString()}.`;
      } else if (record.status === "rejected") {
        message = `Your book renewal request for "${record.title}" has been rejected. Please contact the library if you need assistance.`;
      }

      notify.sendNotification(
        record.user_id,
        message,
        io
      ).then(() => {
        console.log(`Renewal notification sent to user ${record.user_id}`);
      }).catch(err => {
        console.error("Notification Error:", err);
      });
    });
  });
});







const app = express();
app.use(cors());
app.use(express.json());

// REST API Routes
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ✅ Socket.io Setup
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    // Join a room for specific user notifications
    socket.on('join', userId => {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined their notification room`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// ✅ Export io so controllers can use it
app.set('io', io);






const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);










const booksRoutes = require('./routes/booksRoutes');

app.use('/api/books', booksRoutes);






const issueRequestsRoutes = require('./routes/issueRequests');
app.use('/api', issueRequestsRoutes);



const issuedRoute = require('./routes/issuedRoute');

app.use('/api/my-issued-books', issuedRoute);



const chatbotRoutes = require('./routes/chatbot')
app.use('/api', chatbotRoutes)









app.use('/uploads', express.static('uploads'));  

const studentRoutes = require('./routes/student'); 
app.use('/api/student', studentRoutes); 





const announcementsRoute = require('./routes/announcements');
app.use('/api', announcementsRoute);





const activityRoute = require('./routes/activity');
app.use('/api/activity', activityRoute);





const systemNotificationsRoutes = require('./routes/systemNotifications');
app.use('/api', systemNotificationsRoutes);






const stats = require('./routes/Dashboardstats');
app.use('/api/student/stats', stats);



const noDues = require('./routes/noDues');
app.use('/api/nodues', noDues);












const booksR = require("./routes/book");
const categoriesRoutes = require("./routes/categories");
const publishersRoutes = require("./routes/publishers");

app.use("/api/books", booksR);
app.use("/api/admin/categories", categoriesRoutes);
app.use("/api/admin/publishers", publishersRoutes);







const adminRoutes = require("./routes/admin/complaints");
const stuRoutes = require("./routes/student/complaints");

app.use("/api/admin/complaints", adminRoutes);
app.use("/api/complaints", stuRoutes);



const noDuesRoutes = require("./routes/admin/nodues");
app.use("/api/admin/nodues", noDuesRoutes);



const adminissue = require("./routes/admin/issuerequests");
app.use("/api/admin/issuerequests", adminissue);





app.use("/api/admin/overdue-books", require("./routes/admin/overdue-books"));
app.use("/api/admin/fines", require("./routes/admin/fines"));





const borrowedBooksRoutes = require("./routes/borrowed_books");
app.use("/api/borrowed-books", borrowedBooksRoutes);






const reportRoutes = require("./routes/LibReports");
app.use("/api/admin", reportRoutes);




const admin = require("./routes/adminRoutes");
app.use("/api", admin);



require("./cron/dailyBackup");

const backupRoutes = require("./routes/backupRoutes");
app.use("/api/backups", backupRoutes);











const userRoutes = require('./routes/darkRoutes');
app.use('/api', userRoutes);




const SettUpdate = require('./routes/SettingsUpdate');
app.use('/api/student', SettUpdate);






const finesRoutes = require("./routes/student/fines");
app.use("/api/student/fines", finesRoutes);




const eResourcesRoutes = require("./routes/eResources");
app.use("/api", eResourcesRoutes);



const BookMarkRoute=require("./routes/BookmarkRoute");
app.use("/api/bookmarks",BookMarkRoute);







const facultyRoutes = require('./routes/faculty');
app.use('/api/faculty/', facultyRoutes);







const ReturnRoutes = require('./routes/ReturnRequests');
app.use('/api', ReturnRoutes);