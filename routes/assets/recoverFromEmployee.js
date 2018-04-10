const models = require('../../models/index')
const router = require('express').Router()


function recoverAssetHandler(req, res, next){
    models.assets.findOne({ where : {asset_id : req.body.asset_id}})
    .then(asset => {
        asset.current_status = "Available"
        asset.condition = 'Used'
        return asset.save()
    })
    .then(asset => {
        return models.assets_assigned.findOne({where : {asset_id : req.body.asset_id}})
    })
    .then(assetAssigned => {
        assetAssigned.to = req.body.to
        return assetAssigned.save()
    })
    .then(assetAssigned => {
        res.json({
            message : "Asset recovered"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Asset could not be recovered"
        })
    })
}




router.post('/recover', recoverAssetHandler)

module.exports = exports = router