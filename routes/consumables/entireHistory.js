const models = require('../../models/index')
const router = require('express').Router()


function entireHistoryConsumableHandler(req, res, next){
    // var search_consumableid = req.query.consumableid
    var history = []
    var purchased = req.query.purchased
    var assigned = req.query.assigned
    if(purchased === 'false' && assigned === 'false'){
        models.consumables_purchased.findAll({include:[{model:models.consumables}]})
        .then(consumablePurchased=> {
            history.push(...consumablePurchased)
            return models.consumables_assigned.findAll({include:[{model:models.consumables},{model:models.users}]})
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
    else if(purchased === 'true' && assigned === 'false'){
        models.consumables_purchased.findAll({include:[{model:models.consumables}]})
        .then(consumablePurchased=> {
            history.push(...consumablePurchased)
            history.sort(function(a, b){return b.createdAt - a.createdAt})
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
    else if(purchased === 'false' && assigned === 'true'){
        models.consumables_assigned.findAll({include:[{model:models.consumables},{model:models.users}]})
        .then(consumableAssign => {
            history.push(...consumableAssign)
            history.sort(function(a, b){return b.createdAt - a.createdAt})
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
    else{
        models.consumables_purchased.findAll({include:[{model:models.consumables}]})
        .then(consumablePurchased=> {
            history.push(...consumablePurchased)
            return models.consumables_assigned.findAll({include:[{model:models.consumables},{model:models.users}]})
        })
        .then(consumableAssign => {
            history.push(...consumableAssign)
            history.sort(function(a, b){return b.createdAt - a.createdAt})
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
}





// router.post('/history', historyConsumableHandler)


module.exports = exports = entireHistoryConsumableHandler