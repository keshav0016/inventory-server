const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')
const listEmployeeTicketHandler = require('./list')
const tokenAuth = require('../../middleware/tokenAuth')
const listEmployees = require('./listOfEmployees')


const router = require('express').Router()


router.use(tokenAuth)
router.use(listEmployeeTicketHandler)
router.use(createTicketHandler)
router.use(availableAssetHandler)
router.use(listEmployees)


module.exports = exports = router