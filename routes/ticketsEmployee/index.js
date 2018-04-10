const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')
const listEmployeeTicketHandler = require('./list')
const tokenAuth = require('../../middleware/tokenAuth')
const passwordchangehandler = require('../employees/passwordchange')
const currentUserHandler = require('./currentEmployee')
const countHandler = require('./countforprofile')

const router = require('express').Router()


router.use(tokenAuth)
router.use(passwordchangehandler)
router.use(currentUserHandler)
router.use(listEmployeeTicketHandler)
router.use(createTicketHandler)
router.use(availableAssetHandler)
router.use(countHandler)


module.exports = exports = router