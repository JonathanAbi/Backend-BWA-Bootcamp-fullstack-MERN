const express = require('express')
const router = express()

const { create } = require('./controller')
const upload = require('../../../middleware/multer')

router.post('/image',upload.single('avatar'), create)

module.exports = router