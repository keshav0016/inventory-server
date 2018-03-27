const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')
const listEmployeeTicketHandler = require('./list')


const router = require('express').Router()



router.use(listEmployeeTicketHandler)
router.use(createTicketHandler)
router.use(availableAssetHandler)


module.exports = exports = router