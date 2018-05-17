const models = require('../../models/index')
const router = require('express').Router()


function deleteConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {consumable_id : req.body.consumable_id}})
    .then(consumables => {
        consumables.disable = 1;
        return consumables.save()
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





router.post('/delete', deleteConsumableHandler);


module.exports = exports = router;