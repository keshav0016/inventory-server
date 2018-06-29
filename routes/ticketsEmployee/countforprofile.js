const models = require('../../models/index')
const router = require('express').Router()

var assetsCount;
var consumablesCount;
var history = []
var historyAssets =[]


function countHandler(req, res, next){
    var history = []
    var historyAssets =[]
    
    
    models.consumables_assigned.findAll({include:[{model: models.consumables}], where : {user_id : req.currentUser.user_id}})
    .then(consumableAssign => {
        consumableAssign.forEach((consumables)=>{
            history.push(consumables)
            
        })
        return models.assets_assigned.findAll({ include:[{model:models.assets}], where : {user_id : req.currentUser.user_id, to: null}})
        
    })
    .then(assetAssign => {
        assetAssign.forEach((asset) => {
            historyAssets.push(asset)
        })
        return models.assets_assigned.count({where: {user_id : req.currentUser.user_id}})
        
    })
    .then(assets => {
    assetsCount = historyAssets.length;
    return models.consumables_assigned.count({where : {user_id : req.currentUser.user_id}})
    })
    .then(consumables => {
        consumablesCount = consumables
        res.json({
            assetsCount : assetsCount,
            consumablesCount : consumablesCount,
            history : history,
            historyAssets : historyAssets,

        })
    })
    .catch(error => {
        res.json({
            error : error.message || "History could not be displayed"
        })
    })

        
}



router.get('/count', countHandler)

module.exports = exports = router
