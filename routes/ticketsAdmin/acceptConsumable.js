function acceptConsumableTicketHandler(req, res){
    var user;
    var reduce_quantity;
    models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
    .then(ticket => {
        ticket.status = 'Accepted'
        user = ticket.user_id
        return ticket.save()
    })
    .then(ticket => {
        var newConsumableAssign = models.consumables_assigned.build({
            consumable_id : ticket.requested_consumable_id,
            user_id : user,
            ticket_number : ticket.ticket_number,
            assigned_date : Date.now(),
            quantity : ticket.quantity
        })
        return newConsumableAssign.save()
    })
    .then(consumables => {
        reduce_quantity = consumables.quantity
        return models.consumables.findOne({ where : {consumable_id : consumables.consumable_id}})
    })
    .then(consumables => {
        var updated_quantity = consumables.quantity - reduce.quantity
        consumables.quantity = updated_quantity
        return consumables.save()
    })
    .then(assetAssigned => {
        res.json({
            message : "Ticket Accepted"
        })
    })
    .catch(error => {
        res.json({
            error : error.message
        })
    })
}


module.exports = exports = acceptConsumableTicketHandler