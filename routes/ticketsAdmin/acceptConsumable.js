function acceptConsumableTicketHandler(req, res){
    var user;
    models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
    .then(ticket => {
        ticket.status = 'Accepted'
        user = ticket.user_id
        return ticket.save()
    })
    .then(ticket => {
        return models.consumables.findOne({ where : {consumable_id : ticket.requested_consumable_id}})
    })
    .then(consumables => {
        var updated_quantity = consumables.quantity - req.body.quantity
        consumables.quantity = updated_quantity
        return consumables.save()
    })
    .then(consumables => {
        var newConsumableAssign = models.consumables_assigned.build({
            consumable_id : consumables.consumable_id,
            user_id : req.body.user_id,
            ticket_number : req.body.ticket_number,
            assigned_date : req.body.assigned_date,
            quantity : req.body.quantity
        })
        return newConsumableAssign.save()
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