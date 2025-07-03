const express = require('express');
const router = express.Router();
const userController = require('../controllers/darkmodeController');

// Update Dark Mode
router.put('/users/:id/dark-mode', userController.updateDarkMode);

// Get User by ID (Optional)
router.get('/users/:id', userController.getUserById);

module.exports = router;
