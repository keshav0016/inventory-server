const models = require('../../models/index')
const router = require('express').Router()



function repairAssetHandler(req, res, next){
    var newRepairAsset = models.assets_repair.build({
        asset_id: asset.asset_id,
        vendor: req.body.vendor,
        from: req.body.from,
        expected_delivery: req.body.expected_delivery
    })
    return newRepairAsset.save()
    .then(assetRepair => {
        return models.assets.findOne({ where : {asset_id : req.body.asset_id}})
    })
    .then(asset => {
        asset.current_status = "Service"
        return asset.save()
    })
    .then(repairAsset => {
        res.json({
            message : `Repair information has been stored. Please collect the asset on ${repairAsset.expected_delivery}`
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