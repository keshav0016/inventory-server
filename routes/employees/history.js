const models = require('../../models/index')
const router = require('express').Router()



function employeeHistoryHandler(req, res, next){
        // var search_consumableid = req.query.consumableid
        var history = []
        var historyAssets =[]
        var id = []
        var aid = []

        models.consumables_assigned.findAll({ where : {user_id : req.body.user_id}})
        .then(consumableAssign => {
            consumableAssign.forEach((consumable)=>{
                id.push(consumable.consumable_id)
            })
            return models.consumables.findAll({ where : {consumable_id : {$in: id}}})
            
        })
        .then(consumable => {
            history.push(...consumable)
            return models.assets_assigned.findAll({ where : {user_id : req.body.user_id}})
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
                historyAssets : historyAssets
            })
        })
        .catch(error => {
            res.json({
                error : error.message || "History could not be displayed"
            })
        })
    }





router.post('/history', employeeHistoryHandler)


module.exports = exports = router