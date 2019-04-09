const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function enableConsumableHandler(req, res, next){
    return sequelize.transaction((t) => {
        return models.consumables.findOne({ where : {consumable_id : req.body.consumable_id}})
        .then(consumable => {
            consumable.disable = 0;
            return consumable.save({
                transaction: t,
            })
        })
    })
    .then(consumable => {
        res.json({
            message : 'consumable ennabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred enabling the consumable'
        })
    })
}





router.post('/enable', enableConsumableHandler)

module.exports = exports = router