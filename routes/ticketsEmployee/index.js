const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')
const listEmployeeTicketHandler = require('./list')
const tokenAuth = require('../../middleware/tokenAuth')
const listEmployees = require('./listOfEmployees')
const passwordchangehandler = require('../employees/passwordchange')
const currentUserHandler = require('./currentEmployee')


const router = require('express').Router()


router.use(tokenAuth)
router.use(currentUserHandler)
router.use(listEmployeeTicketHandler)
router.use(createTicketHandler)
router.use(availableAssetHandler)
router.use(listEmployees)
router.use(passwordchangehandler)

module.exports = exports = router