const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')

//listing tickets

function listTicket(req,res){
    var page = req.query.page || 1
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


    var pagination = {}


    models.ticket.count({where : {user_id : req.currentUser.user_id, status : {notIn : searchFilter}}})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        return models.ticket.findAll({where : {user_id : req.currentUser.user_id, status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10, order : [['date', 'DESC'] ]})
    })
    .then(ticketsListing=>{
        console.log(ticketsListing)
        res.json({
            ticketsListing, pagination
        })        
    })
}


// router.use(tokenAuth)

router.get('/list',listTicket)
module.exports = exports = router