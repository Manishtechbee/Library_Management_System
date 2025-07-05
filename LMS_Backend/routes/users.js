const express = require('express');
const router = express.Router();
const { getUsers, updateRole, updateStatus, deleteUser, getLib } = require('../controllers/userController');

router.get('/', getUsers);

router.get('/getlib', getLib);
router.put('/:id/role', updateRole);
router.put('/:id/status', updateStatus);
router.delete('/delete/:id', deleteUser);

module.exports = router;
