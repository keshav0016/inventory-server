const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../sendGridApiKey')
//req.currentuser.user_id

//Creating a ticket
function createTicket(req,res){
    var ticketObj = {
        user_id: req.currentUser.user_id,
        date: req.body.date,
        item_type: req.body.item_type,
        quantity: req.body.quantity,
        department: "HR/Admin",
        status: "Pending"
    } 

    sgMail.setApiKey(api)
    const msg = {
        to : 'keshav2016@gmail.com'
        ,from : 'keshav2016@gmail.com'
    }

    var maxLimit
    if(req.body.item_type === 'consumables'){
        ticketObj.requested_consumable_item = req.body.item
        models.consumables.findOne({where: {name : req.body.item.charAt(0).toUpperCase() + req.body.item.slice(1).toLowerCase(), quantity:{gt:0}}})
        .then(consumable => {
            ticketObj.requested_asset_id = null;
            ticketObj.requested_consumable_id = consumable.consumable_id
            var newTicket = models.ticket.build(ticketObj)
            return newTicket.save()
        })
        .then(ticket => {
            msg.subject = `Ticket Request from ${req.currentUser.first_name} ${req.currentUser.last_name}`
            msg.html = `<h4>${req.currentUser.first_name} ${req.currentUser.last_name} (${req.currentUser.user_id}) has requested for ${req.body.item} with quantity : ${req.body.quantity}. <br />For more details, refer to ticket number ${ticket.ticket_number}<br />Sent From Inventory Management Tool</h4>`
            res.json({message:'ticket created'})
            return sgMail.send(msg)
        })
        .then(() => {
            console.log('mail sent')
        })
        .catch(error=>{
            res.json({
                error: 'ticket can not be created'
            })
        })
    }

    if(req.body.item_type === 'assets'){
        ticketObj.requested_asset_item = req.body.item
        models.type.findOne({where : {assetType: req.body.item}})
        .then(type => {
            maxLimit = type.maxRequest
            return models.assets_assigned.count({where : {user_id : req.currentUser.user_id, to : null}, include : [{model : models.assets, where : {assetType : req.body.item}}]})
        })
        .then(count => {
            if(count >= maxLimit){
                res.json({
                    message : 'You already own this kind of Asset'
                })
            }
            else{
                return models.ticket.findOne({where : {user_id : req.currentUser.user_id, requested_asset_item : req.body.item, status : 'Pending'}})
            }
        })
        .then(ticket => {
            if(ticket){
                res.json({
                    message : 'You have already requested for this asset'
                })
            }
            else{
                ticketObj.requested_asset_id = null;
                ticketObj.consumable_id = null
                var newTicket = models.ticket.build(ticketObj)
                return newTicket.save()
            }
        })
        .then(ticket => {
            if(ticket){
                msg.subject = `Ticket Request from ${req.currentUser.first_name} ${req.currentUser.last_name}`
                msg.html = `<h4>${req.currentUser.first_name} ${req.currentUser.last_name} (${req.currentUser.user_id}) has requested for ${req.body.item}. <br />For more details, refer to ticket number ${ticket.ticket_number}<br />Sent From Inventory Management Tool</h4>`
                res.json({message:'ticket created'})
                return sgMail.send(msg)
            }
        })
        .then(() => {
            console.log('mail sent')
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



// 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