const models = require('../../models/index')
const router = require('express').Router()



function employeeHistoryHandler(req, res, next){
    var history = []
    models.users.findAll({ where : {user_id : req.body.user_id}})
    .then(employee => {
        history.push(...employee)
        return models.assets_assigned.findAll({ where : {user_id : req.body.user_id}})
    })
    .then(employeeAsset => {
        history.push(...employeeAsset)
        return models.consumables_assigned.findAll({ where : {user_id : req.body.user_id}})
    })
    .then(employeeConsumable => {
        history.push(...employeeConsumable)
        history.sort(function(a, b){return b.updatedAt - a.updatedAt})
        res.json({
            history : history
        })

    })
    .catch(error => {
        console.log(error)
        res.json({
            error : error.message || "History could not be displayed"
        })
    })
}





router.post('/history', employeeHistoryHandler)


module.exports = exports = router