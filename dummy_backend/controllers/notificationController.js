const db = require('../config/db');

exports.createNotification = (req, res) => {
    const { user_id, message } = req.body;
    const io = req.app.get('io');

    const sql = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
    db.query(sql, [user_id, message], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        // Real-time push to user's room
        io.to(`user_${user_id}`).emit('new_notification', {
            id: result.insertId,
            user_id,
            message,
            is_read: false,
            created_at: new Date()
        });

        res.json({ message: 'Notification created & sent', id: result.insertId });
    });
};

exports.getNotifications = (req, res) => {
    const { user_id } = req.params;
    const sql = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};
exports.markAllAsRead = (req, res) => {
    const { user_id } = req.params;

    const sql = 'UPDATE notifications SET is_read = 1 WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'All notifications marked as read' });
    });
};

