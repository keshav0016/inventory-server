const models = require('../../models/index')
const router = require('express').Router()

//req.currentuser.user_id

//Creating a ticket
function createTicket(req,res){
    var ticketObj = {
        // user_id: req.currentUser.user_id,
        // first_name: req.currentUser.first_name,
        // last_name: req.currentUser.last_name,
        user_id: req.body.user_id,
        date: req.body.date,
        item_type: req.body.item_type,
        quantity: req.body.quantity,
        department: "HR/Admin",
        status: "Pending"
    } 

    if(req.body.item_type === 'assets'){
        ticketObj.requested_asset_item = req.body.item
        models.assets.findOne({where: {asset_name : req.body.item.charAt(0).toUpperCase() + req.body.item.slice(1).toLowerCase(), current_status: "Available"}})
        .then(asset => {
            ticketObj.requested_asset_id = asset.asset_id;
            ticketObj.consumable_id = null
            var newTicket = models.ticket.build(ticketObj)
            return newTicket.save()
        })
        .then(ticket => {
            res.json({ticket, message:'ticket created'})
        })
        .catch(error=>{
            res.json({
                error: 'ticket can not be created'
            })
        })
    }


    if(req.body.item_type === 'consumables'){
        ticketObj.requested_consumable_item = req.body.item
        models.consumables.findOne({where: {name : req.body.item.charAt(0).toUpperCase() + req.body.item.slice(1).toLowerCase()},quantity:{gt:0}})
        .then(consumable => {
            ticketObj.requested_asset_id = null;
            ticketObj.requested_consumable_id = consumable.consumable_id
            var newTicket = models.ticket.build(ticketObj)
            return newTicket.save()
        })
        .then(ticket => {
            res.json({ticket, message:'ticket created'})
        })
        .catch(error=>{
            res.json({
                error: 'ticket can not be created'
            })
        })
    }
    
    
    
}

router.post('/create',createTicket)
module.exports = exports = router