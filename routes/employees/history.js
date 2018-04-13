const models = require('../../models/index')
const router = require('express').Router()



function employeeHistoryHandler(req, res, next){
        // var search_consumableid = req.query.consumableid
        var history = []
        var historyAssets =[]
     

        models.consumables_assigned.findAll({include:[{model:models.consumables}], where : {user_id : req.body.user_id}})
        .then(consumableAssign => {
            consumableAssign.forEach((consumable)=>{
                history.push(consumable)
                
            })
            return models.assets_assigned.findAll({ include:[{model:models.assets}], where : {user_id : req.body.user_id}})
            
        })
        .then(assetAssign => {
            assetAssign.forEach((asset) => {
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
    }





router.post('/history', employeeHistoryHandler)


module.exports = exports = router