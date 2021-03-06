const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function historyConsumableHandler(req, res, next){
    // var search_consumableid = req.query.consumableid
    var history = []
    return models.consumables_purchased.findAll({include:[{model:models.consumables}], where : {consumable_id : req.body.consumable_id}})
    .then(consumablePurchased=> {
        history.push(...consumablePurchased)
        return models.consumables_assigned.findAll({include:[{model:models.consumables},{model:models.users}], where : {consumable_id : req.body.consumable_id}})
    })
    .then(consumableAssign => {
        history.push(...consumableAssign)
        history.sort(function(a, b){return a.createdAt - b.createdAt})
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