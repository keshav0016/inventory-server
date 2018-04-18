const models = require('../../models/index')
const router = require('express').Router()


function listAvailables(req,res){
    var items = [];
     var quantity = [];
    var assetLimit = -1;
    models.type.findAll({
        attributes : ['assetType'],
    })
    .then(assets=>{
        assets.forEach((asset, index) => {
            items.push(asset.assetType)
            assetLimit = index
        })
        return models.consumables.findAll({where:{quantity: {gt: 0} }})
    })
    .then(consumables=>{
        consumables.forEach(consumable => {
            items.push(consumable.name)
            quantity.push(consumable.quantity)
        }) 
        res.json({
            items,assetLimit,quantity
        })
    })
    .catch(error => {
        console.log(error)
    })
}

router.get('/listItems',listAvailables)
module.exports = exports = router 