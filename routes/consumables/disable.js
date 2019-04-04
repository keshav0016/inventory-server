const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function disableConsumableHandler(req, res, next){
    return sequelize.transaction((t) => {
        return models.consumables.findOne({ where : {consumable_id : req.body.consumable_id}})
    .then(consumables => {
        consumables.disable = 1;
        return consumables.save({
            transaction: t,
        })
    })
    })
    .then(consumables => {
        res.json({
            message : 'Consumable disabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error :  'Some error occurred deleting the Consumable'
        })
    })
}





router.post('/disable', disableConsumableHandler);


module.exports = exports = router;