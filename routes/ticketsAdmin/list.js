const models = require('../../models/index')
const router = require('express').Router()
const acceptAssetHandler = require('./acceptTicket')
const rejectAssetHandler = require('./rejectTicket')

function listTicketToAdminHandler(req, res, next){
    var page = req.body.page || 1
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
        searchFilter = ["Accepted", "Rejected"]
    }

    var ticketsListingToAdmin = [];

    models.ticket.findAll({where : {status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10, order : [['date', 'DESC']] })
    .then(ticketsListing => {

        if(ticketsListing){
            ticketsListingToAdmin.push(ticketsListing);
            res.json({
                tickets : ticketsListingToAdmin
            })
        }
        
        else{
            res.json({
                message : 'tickets not found'
            })
        }
    })
}




router.use(acceptAssetHandler)
router.use(rejectAssetHandler)
router.get('/list', listTicketToAdminHandler)

module.exports = exports = router