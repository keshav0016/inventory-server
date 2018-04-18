const models = require('../../models/index')
const router = require('express').Router()

function assignAssetHandler(req, res, next){
    let maxLimit;
    return models.assets.findOne({where : {asset_id : req.body.asset_id}, include : [{model : models.type}]})
    .then(asset => {
        maxLimit = asset.type.maxRequest
        return models.assets_assigned.count({where : {user_id : req.body.user_id, to : null}, include : [{model : models.assets, where : {assetType : asset.assetType}}]})
    })
    .then(count => {
        if(count >= maxLimit && !req.body.assignForce){
            res.json({
                message : "This User already has this type of asset"
                ,requireAssignForce : true
            })
        }
        else{
            checkAssetName(req, res, next)
        }
    })
}


function checkAssetName(req, res, next){
    return models.assets.findOne({where : {asset_id : req.body.asset_id}})
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