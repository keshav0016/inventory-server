const models = require('../../models/index')
const router = require('express').Router()

function enableConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {consumable_id : req.body.consumable_id}})
    .then(consumable => {
        consumable.disable = 0;
        return consumable.save()
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