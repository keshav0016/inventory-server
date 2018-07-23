
const verify = require('./verify')
const router = require('express').Router()
const logout = require('./logout')
const passwordChangeHandler = require('./changepasswordManual')


router.use(verify)
router.use(logout)
router.use(passwordChangeHandler)


module.exports = exports = router