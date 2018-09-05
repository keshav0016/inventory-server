const models = require('../../models/index');
const router = require('express').Router();

var consumableid;

function createConsumablePurchasedDetails(req,res,next,consumableid){return models.consumables_purchased.build({
        consumable_id : consumableid,
        vendor_name : req.body.vendor_name,
        purchase_date : req.body.purchase_date,
        quantity : req.body.purchased_quantity,
        item_price : req.body.item_price,
        whole_price : req.body.whole_price,
        discount : req.body.discount,
        gst : req.body.gst,
        total : req.body.total,
        // description : req.body.description
    })
    .save()
}

function createConsumableHandler(req, res, next){
    models.consumables.findOne({ where : {name : req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)}})
    .then((consumables) => {
        if(consumables){
                var prevDescription = consumables.description
                var added_quantity = Number(req.body.purchased_quantity)
                consumables.quantity = consumables.quantity + added_quantity
                consumables.description = prevDescription + ',  ' + req.body.description
                return consumables.save()
                .then(consumables => {
                    consumableid = consumables.consumable_id;
                    return createConsumablePurchasedDetails(req,res,next,consumableid)
                })
        }
        else {
            return models.consumables.build({
                name : req.body.name.charAt(0).toUpperCase()+req.body.name.slice(1),
                quantity : req.body.purchased_quantity,
                disable: 0  ,
                description: req.body.description              
            })
            .save()
            .then(consumables => {
                consumableid = consumables.consumable_id
                return createConsumablePurchasedDetails(req,res,next,consumableid)
            })
        }


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