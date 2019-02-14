const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')
//req.currentuser.user_id

function calculateFifteenDays(date){
}


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
        to : ['anchal.g@westagilelabs.com']
        , from : 'noreply@westagilelabs.com'
    }

    var maxLimit
    if(req.body.item_type === 'consumables'){
        class StopPromise extends Error  { }
        ticketObj.requested_consumable_item = req.body.item
        var limitDate = new Date(Number(new Date()) - (15*24*60*60*1000))
        let consumableId;
        models.consumables.findOne({where: {name : req.body.item.charAt(0).toUpperCase() + req.body.item.slice(1).toLowerCase(), quantity:{gt:0}}})
        .then(consumable => {
            consumableId = consumable.consumable_id
            return models.ticket.findOne({where : {user_id : req.currentUser.user_id, requested_consumable_id : consumable.consumable_id, status : 'Accepted', updatedAt : {gt : limitDate}}})
        })
        .then(ticket => {
            if(ticket){
                res.json({
                    message : 'You own this item and it has not been 15 days yet'
                })
                throw new StopPromise()
            }
            else{
                return models.ticket.findOne({where : {user_id : req.currentUser.user_id, requested_consumable_id : consumableId, status : 'Pending', updatedAt : {gt :  limitDate}}})
            }
            
        })
        .then(ticket => {
            if(ticket){
                res.json({
                    message : 'You raised ticket for this item and it has not been 15 days yet'
                })
                throw new StopPromise()
            }
            else{
                ticketObj.requested_consumable_id = consumableId
                ticketObj.requested_asset_id = null;
                var newTicket = models.ticket.build(ticketObj)
                return newTicket.save()
            }
        })
        .then(ticket => {
            msg.subject = `New Ticket has been Requested from ${req.currentUser.first_name} ${req.currentUser.last_name}`
            msg.html = `<h4>${req.currentUser.first_name} ${req.currentUser.last_name} (${req.currentUser.user_id}) has requested for ${req.body.item} with quantity : ${req.body.quantity}. <br />For more details, refer to ticket number ${ticket.ticket_number}<br /><br />Thanks</h4>`
            res.json({message:'Ticket created'})
            return sgMail.send(msg)
        })
        .then(() => {
            console.log('mail sent')
        })
        .catch(StopPromise, () => {
            console.log('promise stopped in middle')
        })
        .catch(error=>{
            res.json({
                error: 'ticket can not be created',
                trueError: error,
            })
        })
    }

    if(req.body.item_type === 'assets'){
        class StopPromise extends Error  { }
        
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
                throw new StopPromise()
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
                throw new StopPromise()
            }
            else{
                return models.assets.findOne({where : {asset_name : req.body.assetName, current_status: 'Available'}})
                
            }
        })
        .then(asset => {
                ticketObj.asset_name = asset.asset_name
                ticketObj.requested_asset_id = null;
                ticketObj.consumable_id = null
                var newTicket = models.ticket.build(ticketObj)
                return newTicket.save()
        })
        .then(ticket => {
            if(ticket){
                msg.subject = `Ticket Request from ${req.currentUser.first_name} ${req.currentUser.last_name}`
                msg.html = `<h4>${req.currentUser.first_name} ${req.currentUser.last_name} (${req.currentUser.user_id}) has requested for ${req.body.item}. <br />For more details, refer to ticket number ${ticket.ticket_number}<br />Sent From Inventory Management Tool</h4>`
                res.json({message:'Ticket created'})
                return sgMail.send(msg)
            }
        })
        .then(() => {
            console.log('mail sent')
        })
        .catch(StopPromise, () => {
            console.log('stop')
        })
        .catch(error=>{
            res.json({
                error: 'ticket can not be created',
                trueError: error,
            })
        })
    }
}

router.post('/create',createTicket)
module.exports = exports = router