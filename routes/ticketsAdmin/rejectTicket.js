const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

sgMail.setApiKey(api);

function rejectAssetHandler(req, res, next){
    let admin;
    var user;
    var item;
    var reason = req.body.reason;
    models.users.findOne({where : {email : req.currentUser.email}, attributes: ['first_name', 'last_name']})
    .then(users => {
        admin = users.first_name + " " +users.last_name
        return models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})

    })
    .then(ticket => {
        user = ticket.user_id;
        ticket.status = 'Rejected'
        ticket.reason = req.body.reason
        ticket.adminName = admin
        return ticket.save()
    })
    .then(ticket => {
        if(ticket.requested_asset_item){
            item = ticket.requested_asset_item
        }
        else if (ticket.requested_consumable_item){
            item = ticket.requested_consumable_item
        }
        return models.users.findOne({where : {user_id : user}})
    })
    .then(users => {
        const msg = {
            to : users.email,
            from : 'hr@westagilelabs.com'
            ,subject : `${item} ticket request rejected`
        ,html : `<p>Hello ${users.first_name},<br /><br />The ${item} request has been rejected<br /><br />Remarks : ${reason}<br /><br />Thanks,<br />Team Admin</p>`
        }  
        return sgMail.send(msg)
    })
    .then(()=> {
        res.json({
            message : "Ticket Rejected"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Ticket could not be rejected"
        })
    })
}






router.post('/reject', rejectAssetHandler)

module.exports = exports = router