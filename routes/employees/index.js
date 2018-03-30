const createEmployeeHandler = require('./create')
const updateEmployeeHandler = require('./update')
const deleteEmployeeHandler = require('./delete')
const listEmployeeHandler = require('./list')
const passwordchangehandler = require('./passwordchange')


const router = require('express').Router()


router.use(listEmployeeHandler)
router.use(createEmployeeHandler)
router.use(updateEmployeeHandler)
router.use(deleteEmployeeHandler)
router.use(passwordchangehandler)


module.exports = exports = router