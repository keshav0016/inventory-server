const createAssetHandler = require('./create')
const assignAssetHandler = require('./assign')
const deleteAssetHandler = require('./delete')
const formAssignAssetHandler = require('./formAssignAsset')
const updateAssetHandler = require('./update')
const recoverAssetHandler = require('./recoverFromEmployee')
const repairAssetHandler = require('./repair')
const recoverAssetRepairHandler = require('./recoverFromRepair')
const historyAssetHandler = require('./history')
const listAssetHandler = require('./list')

const router = require('express').Router()


router.use(listAssetHandler)
router.use(historyAssetHandler)
router.use(recoverAssetRepairHandler)
router.use(repairAssetHandler)
router.use(recoverAssetHandler)
router.use(createAssetHandler)
router.use(assignAssetHandler)
router.use(deleteAssetHandler)
router.use(updateAssetHandler)
router.use(formAssignAssetHandler)

module.exports = exports = router