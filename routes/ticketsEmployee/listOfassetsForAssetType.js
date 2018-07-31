const models = require('../../models/index')
const router = require('express').Router()


function listOfAssetsForAssetType(req,res){
    var assetsArr = [];
    models.assets.findAll({attributes: ['asset_name'], group: ['asset_name'],where: {assetType: req.query.assetType, disabled: 0, current_status: "Available"}})
    .then(assets => {
        assets.forEach((asset, index) => {
            assetsArr.push(asset.asset_name)
        });
        res.json({
            assetsArr
        })
    })
    .catch(error => {
       console.log(error)
    })
    
}

router.get('/listAssets',listOfAssetsForAssetType)
module.exports = exports = router 