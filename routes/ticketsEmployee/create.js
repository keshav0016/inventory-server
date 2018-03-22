const models = require('../../models/index')
const router = require('express').Router()

//Creating a ticket
function createTicket(req,res){
    var ticketObj = {
        user_id: req.currentUser.user_id,
        //ticket_number: req.body.ticket_number,
        date: req.body.date,
        // requested_asset_id: req.body.requested_asset_id,
        // requested_consumable_id: req.body.requested_consumable_id,
        item_type: req.body.item_type,
        quantity: req.body.quantity,
        department: "HR/Admin",
        status: "Pending"
    } 

    if(req.body.item_type === 'assets'){
        models.assets.findOne({
            where: {asset_name : req.body.item.charAt(0).toUpperCase() + req.body.item.slice(1).toLowerCase(), status: "Available"}

        })
        .then(asset => {
            ticketObj.requested_asset_id = asset.asset_id;
            ticketObj.consumable_id = null
        })
    }
    if(req.body.item_type === 'consumables'){
        models.consumables.findOne({
            where: {name : req.body.item.charAt(0).toUpperCase() + req.body.item.slice(1).toLowerCase(), status: "Available"}

        })
        .then(asset => {
            ticketObj.requested_asset_id = null;
            ticketObj.consumable_id = consumable_id
        })
    }
    
    var newTicket = models.ticket.build(ticketObj)
    .save()
    .then(function(ticket){
        res.json({ticket, message:'ticket created'})
    })
    .catch(error=>{
        res.json({
            error: 'ticket can not be created'
        })
    })
}

router.post('/create',createTicket)
module.exports = exports = router