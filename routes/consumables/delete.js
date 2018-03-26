const models = require('../../models/index')
const router = require('express').Router()


function deleteConsumableHandler(req, res, next){
    models.consumables.destroy({ where : {consumable_id : req.body.consumable_id}})
    .then(consumables => {
        res.json({
            message : 'Consumable deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the Consumable'
        })
    })
}





router.post('/delete', deleteConsumableHandler);


module.exports = exports = router;