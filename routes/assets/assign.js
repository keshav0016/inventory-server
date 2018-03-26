const models = require('../../models/index')
const router = require('express').Router()


function assignAssetHandler(req, res, next){
    models.assets.findOne({ where : {asset_name : req.body.asset_name, current_status : "Available"}})
    .then(asset => {
        asset.current_status = "Assigned"
        return asset.save()
    })
    .then(asset => {
        var newAssetAssign = models.assets_assigned.build({
            asset_id : asset.asset_id,
            user_id : req.body.user_id,
            from : req.body.from,
            expected_recovery : req.body.expected_recovery
        })
        return newAssetAssign.save()
    })
    .then(assetAssign => {
        res.json({
            message : "Asset Assigned"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Asset could not be assigned"
        })
    })
}





router.post('/assign', assignAssetHandler)

module.exports = exports = router