const models = require('../../models/index')
const router = require('express').Router()

var assetsCount;
var consumablesCount;
var history = []
var historyAssets =[]
var id = []
var aid = []


function countHandler(req, res, next){
    models.assets_assigned.count({where: {user_id : req.currentUser.user_id}})
    .then(assigned => {
        assetsCount = assigned;
        return models.consumables_assigned.count({where : {user_id : req.currentUser.user_id}})
    })
    .then(consumables => {
        consumablesCount = consumables
        return models.consumables_assigned.findAll({ where : {user_id : req.currentUser.user_id}})
    })
    .then(consumableAssign => {
        consumableAssign.forEach((consumable)=>{
            id.push(consumable.consumable_id)
        })
        return models.consumables.findAll({ where : {consumable_id : {$in: id}}})
        
    })
    .then(consumable => {
        history.push(...consumable)
        return models.assets_assigned.findAll({ where : {user_id : req.currentUser.user_id}})
    })
    .then(assetAssign => {
        assetAssign.forEach((asset) => {
            aid.push(asset.asset_id)
        })
        return models.assets.findAll({ where : {asset_id : {$in: aid}}})
    })
    .then(asset => {
        historyAssets.push(...asset)
        res.json({
            history : history,
            historyAssets : historyAssets,
            assetsCount : assetsCount,
            consumablesCount : consumablesCount
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "History could not be displayed"
        })
    })
    // .catch(error => {
    //     res.json({
    //         error : error
    //     })
    // })
}



router.get('/count', countHandler)

module.exports = exports = router