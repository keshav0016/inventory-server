const models = require('../../models/index');
const router = require('express').Router();

var consumable_id;

function createConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {name : req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase()}})
    .then((consumables) => {
        if(consumables){
                var added_quantity = Number(req.body.purchased_quantity)
                consumables.quantity = consumables.quantity + added_quantity
                consumables.save().then(consumables => { consumable_id = consumables.consumable_id })
        }
        else {
            models.consumables.build({
                name : req.body.name.charAt(0).toUpperCase()+req.body.name.slice(1).toLowerCase(),
                quantity : req.body.purchased_quantity
            })
            .save()
            .then(consumables => {
                consumable_id = consumables.consumable_id
            })

        }


        return models.consumables_purchased.build({
            consumable_id : consumable_id,
            vendor_name : req.body.vendor_name,
            purchase_date : req.body.purchase_date,
            quantity : req.body.purchased_quantity
        })
        .save()
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