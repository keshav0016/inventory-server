const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;


function repairAssetHandler(req, res, next){
    return sequelize.transaction((t) => {
        var newRepairAsset = models.assets_repair.build({
            asset_id: req.body.asset_id,
            vendor: req.body.vendor,
            from: req.body.from,
            expected_delivery: req.body.expected_delivery
        })
        return newRepairAsset.save({
            transaction: t,
        })
        .then(assetRepair => {
            return models.assets.findOne({ where : {asset_id : req.body.asset_id}})
        })
        .then(asset => {
            asset.current_status = "Service"
            return asset.save({
                transaction: t,
            })
        })
    })
    
    .then(() => {
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