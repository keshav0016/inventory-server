const models = require('../../models/index')
const router = require('express').Router()
const createTicketHandler = require('./create')
const availableAssetHandler = require('./listOfAvailables')

//listing tickets

function listTicket(req,res){
    var page = req.body.page
    var searchFilter = []
    var filter = {
        "Accepted" : true,
        "Pending" : true,
        "Rejected" : true
    }

    for(var key in req.query){
        if(req.query[key] === "false"){
            searchFilter.push(key)
        }
    }


    if(searchFilter.length === 0){
        searchFilter[0] = ""
    }

    var ticketsOfCurrentUser = [];

    models.ticket.findAll({where : {user_id : req.currentUser.user_id, status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10, order : ['date', 'DESC'] })
    .then(ticketsListing=>{
        
        if(ticketsListing){
            ticketsOfCurrentUser.push(ticketsListing);
            res.json({
                tickets : ticketsPending
            })
        }
        
        else{
            res.json({
                message : 'tickets not found'
            })
        }
    })
}



router.use(createTicketHandler)
router.use(availableAssetHandler)
router.get('/list',listTicket)
module.exports = exports = router