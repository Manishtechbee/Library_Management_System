const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');



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






require('dotenv').config();



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
app.use('/api/announcements', announcementsRoute);





const activityRoute = require('./routes/activity');
app.use('/api/activity', activityRoute);





const systemNotificationsRoutes = require('./routes/systemNotifications');
app.use('/api/system-notifications', systemNotificationsRoutes);






const stats = require('./routes/Dashboardstats');
app.use('/api/student/stats', stats);



const noDues = require('./routes/noDues');
app.use('/api/nodues', noDues);