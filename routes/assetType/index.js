const createAssetHandler = require('./create')
const listAssetHandler = require('./list')
const admintokenAuth = require('../../middleware/admintokenAuth')

const router = require('express').Router()

router.use(admintokenAuth)
router.use(createAssetHandler)
router.use(listAssetHandler)




module.exports = exports = router