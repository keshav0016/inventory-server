const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function deleteConsumableHandler(req, res, next){
    return sequelize.transaction((t) => {
        return models.consumables.destroy({ where : {consumable_id : req.body.consumable_id}, transaction: t})
    })
    .then(consumables => {
        if(consumables === 0) {
            res.json({
                message : 'consumable can not be deleted',
                consumables : consumables
            })
        } else {
            res.json({
                message : 'consumable has been deleted'
            })
        }
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the consumable'
        })
    })
}





router.post('/delete', deleteConsumableHandler);


module.exports = exports = router;