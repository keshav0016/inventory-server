const models = require('../../models/index')
const router = require('express').Router()

//listing tickets

function listTicket(req,res){
    var page = req.body.page
    models.ticket.findAll({where : {user_id : req.currentUser.user_id}, limit: 10, offset: (page - 1) * 10 })
    .then(ticketsListing=>{
        var ticketsPending = [];
        if(ticketsListing){
            ticketsPending.push(ticketsListing);
            ticketsPending.sort(function(a, b){return b.date - a.date})
            res.json({
                tickets = ticketsPending
            })
        }else{
            res.json({
                message:'tickets not found'
            })
        }
    })
}

router.post('/list',listTicket)
module.exports = exports = router