const models = require('../../models/index')
const router = require('express').Router()


function listAvailables(req,res){
    var items = [];
    var assetLimit = 0;
    models.assets.findAll({
        where:{current_status: 'available'},
        group: 'asset_id'
    })
    .then(assets=>{
        assets.forEach((asset, index) => {
            items.push(asset.asset_name)
            assetLimit = index
        })
        return models.consumables.findAll({where:{quantity: {gt: 0} }})
    })
    .then(consumables=>{
        consumables.forEach(consumable => {
            items.push(consumable.name)
        }) 
        res.json({
            items,assetLimit
        })
    })
}

router.get('/listItems',listAvailables)
module.exports = exports = router 