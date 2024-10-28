const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middleware/auth');

router.get('/payments', authenticateUser, authorizeRoles('organizer'), index);
router.get('/payment/:id', authenticateUser,authorizeRoles('organizer'), find);
router.put('/payment/:id', authenticateUser, authorizeRoles('organizer'), update);
router.delete('/payment/:id', authenticateUser, authorizeRoles('organizer'), destroy);
router.post('/payment', authenticateUser, authorizeRoles('organizer'), create);

module.exports = router;