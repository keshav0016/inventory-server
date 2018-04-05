const acceptAssetHandler = require('./acceptTicket')
const rejectAssetHandler = require('./rejectTicket')
const listTicketHandler = require('./list')
const dashBoardCount = require('./dashBoardCount')

const router = require('express').Router()



router.use(listTicketHandler)
router.use(acceptAssetHandler)
router.use(rejectAssetHandler)
router.use(dashBoardCount)


module.exports = exports = router