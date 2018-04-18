const createAssetTypeHandler = require('./create')
const listAssetTypeHandler = require('./list')
const updateAssetTypeHandler = require('./update')
const admintokenAuth = require('../../middleware/admintokenAuth')

const router = require('express').Router()

router.use(admintokenAuth)
router.use(createAssetTypeHandler)
router.use(listAssetTypeHandler)
router.use(updateAssetTypeHandler)



module.exports = exports = router