const adminListHandler = require('./list')
const admintokenAuth = require('../../middleware/admintokenAuth')
const router = require('express').Router()

router.use(adminListHandler)
// router.use(admintokenAuth)




module.exports = exports = router