const models = require('../../models/index')
const router = require('express').Router()


function listTicketToAdminHandler(req, res, next){
    var page = req.body.page || 1
    var pagination = {}
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


    
    
    var ticketsListingToAdmin = [];
    
    models.ticket.findAll({where : {status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10, order : [['date', 'DESC']] })
    .then(ticketsListing => {
        
        if(ticketsListing){
            ticketsListingToAdmin.push(...ticketsListing);
            return models.ticket.count({where : {status : {notIn : searchFilter}}})
        }
        
        else{
            res.json({
                message : 'tickets not found'
            })
        }
    })
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        res.json({
            tickets: ticketsListingToAdmin,
            pagination: pagination
        })
    })
    .catch(error => {
        error : error.message || "Tickets could not be listed"
    })
}




router.get('/list', listTicketToAdminHandler)

module.exports = exports = router