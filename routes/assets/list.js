const models = require('../../models/index')
const router = require('express').Router()
const createAssetHandler = require('./create')
const assignAssetHandler = require('./assign')
const deleteAssetHandler = require('./delete')
const formAssignAssetHandler = require('./formAssignAsset')
const updateAssetHandler = require('./update')
const recoverAssetHandler = require('./recoverFromEmployee')
const repairAssetHandler = require('./repair')
const recoverAssetRepairHandler = require('./recoverFromRepair')

function listAssetHandler(req, res, next){
    var page = req.query.page || 1
    var searchFilter = []
    var filter = {
        "Available" : true,
        "Assigned" : true,
        "Service" : true
    }

    for(var key in req.query){
        if(req.query[key] === "false"){
            searchFilter.push(key)
        }
    }


    if(searchFilter.length === 0){
        searchFilter[0] = ""
    }

    models.assets.findAll({ where : {current_status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10})
    .then(assets => {
        res.json({
            assets : assets
        })
    })
    .catch(error => {
        res.json({
            assets : `No assets`
        })
    })
}



router.use(recoverAssetRepairHandler)
router.use(repairAssetHandler)
router.use(recoverAssetHandler)
router.use(createAssetHandler)
router.use(assignAssetHandler)
router.use(deleteAssetHandler)
router.use(updateAssetHandler)
router.use(formAssignAssetHandler)
router.get('/list', listAssetHandler)


module.exports = exports = router