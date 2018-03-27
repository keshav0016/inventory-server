const models = require('../../models/index');
const router = require('express').Router();


function createConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {name : req.body.name}})
    .then((consumables) => {
        if(consumables){
                quantity = consumables.quantity + req.body.quantity
                consumables.save()
        }
        else {
            models.consumables.build({
                consumable_id : req.body.consumable_id,
                name : req.body.name,
                quantity : req.body.quantity
            })
            .save()
        }

        models.consumables_purchased.build({
            consumable_id : req.body.consumable_id,
            vendor_name : req.body.vendor_name,
            purchase_date : req.body.purchase_date,
            quantity : req.body.purchased_quantity
        })
    })
    .then(consumables => {
        res.json({
            message : 'Consumable added successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred'
        })
    })
}




router.post('/create', createConsumableHandler);


module.exports = exports = router