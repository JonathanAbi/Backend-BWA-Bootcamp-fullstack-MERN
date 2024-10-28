const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middleware/auth')


router.get('/talents',authenticateUser, authorizeRoles('organizer'), index);
router.get('/talent/:id',authenticateUser, authorizeRoles('organizer'), find);
router.put('/talent/:id',authenticateUser, authorizeRoles('organizer'), update);
router.delete('/talent/:id',authenticateUser, authorizeRoles('organizer'), destroy);
router.post('/talent', authenticateUser, authorizeRoles('organizer'), create);

module.exports = router;