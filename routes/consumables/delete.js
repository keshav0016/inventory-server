const models = require('../../models/index')
const router = require('express').Router()


function deleteConsumableHandler(req, res, next){
    models.consumables.destroy({ where : {consumable_id : req.body.consumable_id}})
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