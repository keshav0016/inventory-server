const models = require('../../models/index')
const router = require('express').Router()



function employeeHistoryHandler(req, res, next){
        // var search_consumableid = req.query.consumableid
        var history = []
        models.consumables_assigned.findAll({ where : {user_id : req.body.user_id}})
        .then(consumableAssign => {
            history.push(...consumableAssign)
            return models.assets_assigned.findAll({ where : {user_id : req.body.user_id}})
        })
        .then(assetAssign => {
            history.push(...assetAssign)
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





router.post('/history', employeeHistoryHandler)


module.exports = exports = router