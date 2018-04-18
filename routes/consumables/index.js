const createConsumableHandler = require('./create')
const deleteConsumableHandler = require('./delete')
const updateConsumableHandler = require('./update')
const assignConsumableHandler = require('./assign')
const historyConsumableHandler = require('./history')
const entireHistoryConsumableHandler = require('./entireHistory')
const listConsumableHandler = require('./list')
const updateConsumablePurchaseHandler = require('./editpurchase')
const admintokenAuth = require('../../middleware/admintokenAuth')

const router = require('express').Router()

router.use(admintokenAuth)
router.use(listConsumableHandler)
router.use(createConsumableHandler)
router.use(deleteConsumableHandler)
router.use(updateConsumableHandler)
router.use(updateConsumablePurchaseHandler)
router.use(assignConsumableHandler)
router.get("/entirehistory", entireHistoryConsumableHandler)
router.post("/history", historyConsumableHandler)

module.exports = exports = router