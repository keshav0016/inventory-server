const acceptAssetHandler = require('./acceptTicket')
const rejectAssetHandler = require('./rejectTicket')
const listTicketHandler = require('./list')
const dashBoardCount = require('./dashBoardCount')
const listEmployees = require('../ticketsEmployee/listOfEmployees')
const admintokenAuth = require('../../middleware/admintokenAuth')
const availableAssetsHandler = require('./availableAssets')
const AdminPasswordChange = require('./changePassword');

const router = require('express').Router()


router.use(admintokenAuth)
router.use(availableAssetsHandler)
router.use(listTicketHandler)
router.use(acceptAssetHandler)
router.use(rejectAssetHandler)
router.use(dashBoardCount)
router.use(listEmployees)
router.use(AdminPasswordChange)


module.exports = exports = router