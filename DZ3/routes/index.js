const express = require('express')
const router = express.Router()

router.use('/', require('./main'))

router.use('/login', require('./login'))

router.use('/logout', require('./logout'))

router.use('/admin', require('./admin'))

module.exports = router
