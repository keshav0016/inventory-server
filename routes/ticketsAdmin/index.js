const acceptAssetHandler = require('./acceptTicket')
const rejectAssetHandler = require('./rejectTicket')
const listTicketHandler = require('./list')

const router = require('express').Router()



router.use(listTicketHandler)
router.use(acceptAssetHandler)
router.use(rejectAssetHandler)


module.exports = exports = router