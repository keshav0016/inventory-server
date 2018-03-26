const models = require('../../models/index')
const router = require('express').Router()



function historyConsumableHandler(req, res, next){
    var history = []
    models.consumables_assigned.findAll({ where : {name : req.body.name}})
    .then(consumableAssign => {
        history.push(...consumableAssign)
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





router.post('/history', historyConsumableHandler)


module.exports = exports = router