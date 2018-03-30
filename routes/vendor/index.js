const createVendorHandler = require('./create')
const listVendorHandler = require('./list')
const updateVendorHandler = require('./update')
const router = require('express').Router()


router.use(createVendorHandler)
router.use(listVendorHandler)
router.use(updateVendorHandler)

module.exports = exports = router

