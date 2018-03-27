const models = require('../../models/index')
const router = require('express').Router()


function assignConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {name : req.body.name.charAt(0).toUppercase()+req.body.name.slice(1).toLowercase(), quantity : {gt : 0}}})
    .then(consumables => {
        var updated_quantity = consumables.quantity - req.body.quantity
        consumables.quantity = updated_quantity
        return consumables.save()
    })
    .then(consumables => {
        var newConsumableAssign = models.consumables_assigned.build({
            consumable_id : consumables.consumable_id,
            user_id : req.body.user_id,
            assigned_date : req.body.assigned_date,
            quantity : req.body.quantity
        })
        return newConsumableAssign.save()
    })
    .then(consumableAssign => {
        res.json({
            message : "Consumable Assigned"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Consumable could not be assigned, Quantity too low."
        })
    })
}





router.post('/assign', assignConsumableHandler)

module.exports = exports = router