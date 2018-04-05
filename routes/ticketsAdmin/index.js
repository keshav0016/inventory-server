const acceptAssetHandler = require('./acceptTicket')
const rejectAssetHandler = require('./rejectTicket')
const listTicketHandler = require('./list')
const dashBoardCount = require('./dashBoardCount')
const listEmployees = require('../ticketsEmployee/listOfEmployees')

const router = require('express').Router()



router.use(listTicketHandler)
router.use(acceptAssetHandler)
router.use(rejectAssetHandler)
router.use(dashBoardCount)
router.use(listEmployees)


module.exports = exports = router