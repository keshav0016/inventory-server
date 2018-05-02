const models = require('../../models/index')
const router = require('express').Router()

function enableAssetHandler(req, res, next){
    models.assets.findOne({ where : {asset_id : req.body.asset_id}})
    .then(asset => {
        asset.disabled = 0;
        return asset.save()
    })
    .then(asset => {
        res.json({
            message : 'Asset ennabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred enabling the asset'
        })
    })
}





router.post('/enable', enableAssetHandler)

module.exports = exports = router