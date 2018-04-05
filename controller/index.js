
const verify = require('./verify')
const router = require('express').Router()
const logout = require('./logout')

router.use(verify)
router.use(logout)


module.exports = exports = router