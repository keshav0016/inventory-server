const models = require('../../models/index');
const router = require('express').Router();
const sequelize = models.sequelize;

function updateConsumableHandler(req, res, next){
    return sequelize.transaction((t) => {
        return models.consumables.findOne({ where : {consumable_id : req.body.consumable_id}})
    .then(consumables => {
        consumables.consumable_id = req.body.consumable_id,
        consumables.name = req.body.name,
        consumables.quantity = req.body.quantity
        consumables.description = req.body.description
        return consumables.save({
            transaction: t,
        })
    })
    })
    .then(consumables => {
        res.json({
            message : 'Consumable updated successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred'
        })
    })
}





router.post('/update', updateConsumableHandler)
module.exports = exports = router