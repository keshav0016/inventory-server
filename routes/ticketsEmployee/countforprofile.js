const models = require('../../models/index')
const router = require('express').Router()
const db = require('../../models/index')
const sequelize = require('sequelize')

var assetsCount;
var consumablesCount;
var history = []
var historyAssets =[]


function countHandler(req, res, next){
    var userId = req.currentUser.user_id
    var history = []
    var historyAssets =[]
    
    
    db.sequelize.query(`SELECT consumables_assigneds.consumable_id,consumables.name,sum(consumables_assigneds.quantity) from consumables_assigneds  INNER JOIN consumables ON consumables_assigneds.consumable_id=consumables.consumable_id where user_id=:user_id group by consumables_assigneds.consumable_id,consumables.name`, 
    { replacements: { user_id: userId }, type: sequelize.QueryTypes.SELECT })
    .then((consumables) => {
        history.push(...consumables)
        return models.assets_assigned.findAll({ include:[{model:models.assets}], where : {user_id : req.currentUser.user_id}})
    })
    .then(assetsAssigned => {
        assetsAssigned.forEach(asset => {
            historyAssets.push(asset)
        })
        return models.assets_assigned.count({include:[{model:models.assets}], where : {user_id : req.currentUser.user_id}})
        
    })
    .then(assets => {
        assetsCount = assets
        return models.consumables_assigned.count({include:[{model:models.consumables}], where : {user_id : req.currentUser.user_id}})
    })
    .then(consumables => {
        consumablesCount = consumables
        res.json({
            history : history,
            historyAssets : historyAssets,
            assetsCount ,
            consumablesCount : history.length
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
