const models = require('../../models/index')
const router = require('express').Router()
const db = require('../../models/index')
const sequelize = require('sequelize')


function employeeHistoryHandler(req, res, next){
        var userId = req.body.user_id
        // var search_consumableid = req.query.consumableid
        var history = []
        var historyAssets =[]
     
        db.sequelize.query(`SELECT consumables_assigneds.consumable_id,consumables.name,sum(consumables_assigneds.quantity) from consumables_assigneds  INNER JOIN consumables ON consumables_assigneds.consumable_id=consumables.consumable_id where user_id=:user_id group by consumables_assigneds.consumable_id,consumables.name`, 
        { replacements: { user_id: userId }, type: sequelize.QueryTypes.SELECT })
        .then((consumables) => {
                history.push(...consumables)
            return models.assets_assigned.findAll({ include:[{model:models.assets}], where : {user_id : req.body.user_id}})
        })
        .then(assetsAssigned => {
            assetsAssigned.forEach(asset => {
                historyAssets.push(asset)
            })
            res.json({
                history : history,
                historyAssets : historyAssets,
            })
        })
        .catch(error => {
            res.json({
                error : error.message || "History could not be displayed"
            })
        })
        // models.consumables_assigned.findAll({include:[{model:models.consumables}], where : {user_id : req.body.user_id}})
        // .then(consumableAssign => {
        //     consumableAssign.forEach((consumable)=>{
        //         history.push(consumable)
                
        //     })
        //     return models.assets_assigned.findAll({ include:[{model:models.assets}], where : {user_id : req.body.user_id}})
            
        // })
        // .then(assetAssign => {
        //     assetAssign.forEach((asset) => {
        //         historyAssets.push(asset)
        //     })
        //     res.json({
        //         history : history,
        //         historyAssets : historyAssets,
        //     })
        // })
        // .catch(error => {
        //     res.json({
        //         error : error.message || "History could not be displayed"
        //     })
        // })
    }





router.post('/history', employeeHistoryHandler)


module.exports = exports = router