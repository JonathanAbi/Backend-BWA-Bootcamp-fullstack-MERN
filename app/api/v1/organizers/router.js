const express = require('express')
const router = express()

const { createCMSOrganizer, createCMSUser, getCMSUsers } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middleware/auth')

router.post('/organizer',authenticateUser, authorizeRoles('owner'), createCMSOrganizer)
router.post('/user', authenticateUser, authorizeRoles('organizer'), createCMSUser)
router.get('/users', authenticateUser, authorizeRoles('owner'), getCMSUsers)

module.exports = router