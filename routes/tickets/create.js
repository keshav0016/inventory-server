const models = require('../../models/index')
const router = require('express').Router()

//Creating a ticket
function createTicket(req,res){
    models.ticket.create({
        user_id: req.currentUser.user_id,
        ticket_number: req.body.ticket_number,
        date: req.body.date,
        requested_asset_id: req.body.requested_asset_id,
        requested_consumable_id: req.body.requested_consumable_id,
        item_type: req.body.item_type,
        quantity: req.body.quantity,
        department: "HR/Admin",
        status: req.body.status
    })
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