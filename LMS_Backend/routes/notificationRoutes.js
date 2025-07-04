const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/', notificationController.createNotification);
router.get('/:user_id', notificationController.getNotifications);
router.put('/mark-all-read/:user_id', notificationController.markAllAsRead);


module.exports = router;
