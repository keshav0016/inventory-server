const createEmployeeHandler = require('./create')
const updateEmployeeHandler = require('./update')
const deleteEmployeeHandler = require('./delete')
const listEmployeeHandler = require('./list')


const router = require('express').Router()


router.use(listEmployeeHandler)
router.use(createEmployeeHandler)
router.use(updateEmployeeHandler)
router.use(deleteEmployeeHandler)


module.exports = exports = router