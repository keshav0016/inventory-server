const createEmployeeHandler = require('./create')
const updateEmployeeHandler = require('./update')
const deleteEmployeeHandler = require('./delete')
const listEmployeeHandler = require('./list')
const employeehistoryhandler = require('./history')
const resetPasswordHandler = require('../../controller/resetPassword')
const admintokenAuth = require('../../middleware/admintokenAuth')
const assetHandler = require('./asset')
const router = require('express').Router()

router.use(assetHandler)
router.use(resetPasswordHandler)
router.use(admintokenAuth)
router.use(listEmployeeHandler)
router.use(createEmployeeHandler)
router.use(updateEmployeeHandler)
router.use(deleteEmployeeHandler)
router.use(employeehistoryhandler)



module.exports = exports = router