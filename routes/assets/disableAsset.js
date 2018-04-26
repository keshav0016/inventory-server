const models = require('../../models/index')
const router = require('express').Router()

function disableAssetHandler(req, res, next){
    models.assets.findOne({ where : {asset_id : req.body.asset_id}})
    .then(asset => {
        asset.disabled = 1;
        return asset.save()
    })
    .then(asset => {
        res.json({
            message : 'Asset deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the asset'
        })
    })
}





router.post('/disable', disableAssetHandler)

module.exports = exports = router