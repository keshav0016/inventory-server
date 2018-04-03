const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')
const listEmployeeTicketHandler = require('./list')
const listEmployees = require('./listOfEmployees')


const router = require('express').Router()



router.use(listEmployeeTicketHandler)
router.use(createTicketHandler)
router.use(availableAssetHandler)
router.use(listEmployees)


module.exports = exports = router