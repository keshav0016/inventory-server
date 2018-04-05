const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')
const listEmployeeTicketHandler = require('./list')
const tokenAuth = require('../../middleware/tokenAuth')
const passwordchangehandler = require('../employees/passwordchange')


const router = require('express').Router()


router.use(tokenAuth)
router.use(listEmployeeTicketHandler)
router.use(createTicketHandler)
router.use(availableAssetHandler)
router.use(passwordchangehandler)


module.exports = exports = router