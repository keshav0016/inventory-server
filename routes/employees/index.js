const createEmployeeHandler = require('./create')
const updateEmployeeHandler = require('./update')
const disableEmployeeHandler = require('./delete')
const listEmployeeHandler = require('./list')
const employeehistoryhandler = require('./history')
const enableEmployeeHandler = require('./enable')
const resetPasswordHandler = require('../../controller/resetPassword')
const admintokenAuth = require('../../middleware/admintokenAuth')
const router = require('express').Router()

router.use(resetPasswordHandler)
router.use(admintokenAuth)
router.use(listEmployeeHandler)
router.use(createEmployeeHandler)
router.use(updateEmployeeHandler)
router.use(disableEmployeeHandler)
router.use(employeehistoryhandler)
router.use(enableEmployeeHandler)




module.exports = exports = router