const models = require('../../models/index')
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

sgMail.setApiKey(api);

function acceptConsumableTicketHandler(req, res){
    let admin;
    var user;
    var ticketQuantity
    var reduce_quantity;
    var consumableName;
    var reason = req.body.reason;
    models.users.findOne({where : {email : req.currentUser.email}, attributes : ['first_name', 'last_name']})
    .then(users => {
        if(users.first_name && users.last_name){
            admin = users.first_name + " " +users.last_name
        }else{
            admin = "Admin"
        }        return models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})

    })
    .then(ticket => {
        ticketQuantity = ticket.quantity
        return models.consumables.findOne({ where : {consumable_id : ticket.requested_consumable_id}})
    })
    .then(consumable => {
        if(consumable.disable === 0){
                consumableName = consumable.name;
            if(ticketQuantity < consumable.quantity){
                models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
                .then(ticket => {
                    ticket.status = 'Accepted'
                    ticket.reason = req.body.reason
                    ticket.adminName = admin
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
                    var updated_quantity = consumables.quantity - Number(reduce_quantity)
                    consumables.quantity = updated_quantity
                    return consumables.save()
                })
                .then(consumables => {
                    return models.users.findOne({ where : {user_id : user}})
                })
                .then(users => {
                    const msg = {
                        to : users.email,
                        from : 'hr@westagilelabs.com'
                        ,subject : `Consumable ${consumableName} ticket request accepted`
                    ,html : `<p>Hello ${users.first_name},<br /><br />The ${consumableName} consumable request has been accepted<br /><br />Remarks : ${reason}<br /><br />Thanks,<br />Team Admin</p>`
                    }  
                    return sgMail.send(msg)
                })
                .then(() => {
                    res.json({
                        message : "Ticket Accepted"
                    })
                })
            }
            else {
                res.json({
                    message : "Requested Quantity greater than available"
                })
            }
        }
        else{
            res.json({
                message : "Requested item is disabled"
            })
        }
    })
    .catch(error => {
        res.json({
            error : error.message
        })
    })
}


module.exports = exports = acceptConsumableTicketHandler