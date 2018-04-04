const models = require('../../models/index')
const router = require('express').Router()


function historyConsumableHandler(req, res, next){
    // var search_consumableid = req.query.consumableid
    var history = []
    models.consumables_assigned.findAll({ where : {consumable_id : req.body.consumable_id}})
    .then(consumableAssign => {
        history.push(...consumableAssign)
        return models.consumables_purchased.findAll({ where : {consumable_id : req.body.consumable_id}})
    })
    .then(consumablePurchased => {
        history.push(...consumablePurchased)
        history.sort(function(a, b){return b.updatedAt - a.updatedAt})
        res.json({
            history : history
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "History could not be displayed"
        })
    })
}





// router.post('/history', historyConsumableHandler)


module.exports = exports = historyConsumableHandler