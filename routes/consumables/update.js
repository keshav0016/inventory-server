const models = require('../../models/index');
const router = require('express').Router();


function updateConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {consumable_id : req.body.consumable_id}})
    .then(consumables => {
        consumables.name = req.body.name,
        consumables.quantity = req.body.quantity

        return consumables.save()
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