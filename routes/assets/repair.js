const models = require('../../models/index')
const router = require('express').Router()



function repairAssetHandler(req, res, next){
    var newRepairAsset = models.assets_repair.build({
        asset_id: req.body.asset_id,
        vendor: req.body.vendor,
        from: new Date(req.body.from).toUTCString(),
        expected_delivery: new Date(req.body.expected_delivery).toUTCString()
    })
    return newRepairAsset.save()
    .then(assetRepair => {
        return models.assets.findOne({ where : {asset_id : req.body.asset_id}})
    })
    .then(asset => {
        asset.current_status = "Service"
        return asset.save()
    })
    .then(asset => {
        res.json({
            message : `Repair information has been stored.`
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "repair info could not be stored"
        })
    })
}





router.post('/repair', repairAssetHandler)


module.exports = exports = router