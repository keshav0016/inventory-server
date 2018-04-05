const createConsumableHandler = require('./create')
const deleteConsumableHandler = require('./delete')
const updateConsumableHandler = require('./update')
const assignConsumableHandler = require('./assign')
const historyConsumableHandler = require('./history')
const listConsumableHandler = require('./list')


const router = require('express').Router()


router.use(listConsumableHandler)
router.use(createConsumableHandler)
router.use(deleteConsumableHandler)
router.use(updateConsumableHandler)
router.use(assignConsumableHandler)
router.post("/history", historyConsumableHandler)

module.exports = exports = router