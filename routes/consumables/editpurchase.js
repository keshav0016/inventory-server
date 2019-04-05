const models = require('../../models/index');
const router = require('express').Router();
const sequelize = models.sequelize;
var previousPurchasedQuantity;
var changeInQuantity;
var previousConsumableQuantity;

function updateConsumablePurchaseHandler(req, res, next) {
    return sequelize.transaction((t) => {
        return models.consumables_purchased.findOne({ where: { consumable_id: req.body.consumable_id, vendor_name: req.body.vendor_name } })
            .then(consumablesPurchased => {

                previousPurchasedQuantity = consumablesPurchased.quantity
                consumablesPurchased.consumable_id = req.body.consumable_id,
                consumablesPurchased.vendor_name = req.body.vendor_name,
                consumablesPurchased.purchase_date = req.body.purchase_date,
                consumablesPurchased.quantity = req.body.purchased_quantity
                consumablesPurchased.item_price = req.body.item_price,
                consumablesPurchased.whole_price = req.body.whole_price,
                consumablesPurchased.discount = req.body.discount,
                consumablesPurchased.gst = req.body.gst,
                consumablesPurchased.total = req.body.total
                changeInQuantity = req.body.purchased_quantity - previousPurchasedQuantity

                return consumablesPurchased.save({
                    transaction: t,
                })
            })
            .then(consumables => {
                return models.consumables.findOne({ where: { consumable_id: consumables.consumable_id } })

            })
            .then(consumables => {
                previousConsumableQuantity = consumables.quantity
                consumables.quantity = previousConsumableQuantity + changeInQuantity
                return consumables.save({
                    transaction: t,
                })
            })
    })
        .then(() => {
            res.json({
                message: 'Updated Consumable Purchase Detail Successfully'
            })
        })
        .catch(error => {
            res.json({
                error: 'Some error occurred'
            })
        })
}





router.post('/editPurchase', updateConsumablePurchaseHandler)
module.exports = exports = router