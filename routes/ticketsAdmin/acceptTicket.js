const models = require('../../models/index')
const router = require('express').Router()
const acceptAsset = require('./acceptAsset')
const acceptConsumable = require('./acceptConsumable')


function acceptTicketHandler(req, res, next){
    models.ticket.findOne({where : {ticket_number : req.body.ticket_number}})
    .then(ticket => {
        if(ticket.item_type === 'assets'){
            acceptAsset(req, res)
        }
        else{
            if(ticket.item_type === 'consumables'){
                acceptConsumable(req, res)
            }
        }
    })
    .catch(error => {
        error : error.message || "Ticket could not be accepted"
    })
}







router.post('/accept', acceptTicketHandler)

module.exports = exports = router