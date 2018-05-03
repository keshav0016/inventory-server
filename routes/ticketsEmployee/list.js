const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')

//listing tickets

function listTicket(req,res){
    var assetPage = req.query.assetPage || 1
    var consumablePage = req.query.consumablePage || 1
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


    var assetPagination = {}
    var consumablePagination = {}
    var ticketsConsumableListing = [];
    var ticketsAssetsListing = [];

    models.ticket.findAll({where : {user_id : req.currentUser.user_id, status : {notIn : searchFilter}, item_type : 'consumables'}, limit: 10, offset: (consumablePage - 1) * 10, order : [['date', 'DESC'] ]})
    .then(ticketConsumables=>{
        if(ticketConsumables){
            ticketsConsumableListing.push(...ticketConsumables)
        }
        return models.ticket.count({where : {status : {in : searchFilter}, item_type : 'consumables'}})
              
    })
    .then(numberOfRecords => {
        consumablePagination.totalPage = Math.ceil(numberOfRecords / 10);
        consumablePagination.currentPage = consumablePage
        return models.ticket.findAll({ where : {user_id : req.currentUser.user_id, status : {notIn : searchFilter}, item_type : 'assets'}, limit: 10, offset: (assetPage - 1) * 10, order : [['date', 'DESC'] ]})
    })
    .then(ticketsAssets => {
        if(ticketsAssets){
            ticketsAssetsListing.push(...ticketsAssets);
        }
        return models.ticket.count({where : {status : {in : searchFilter}, item_type : 'assets'}})
    })
    .then(numberOfRecords => {
        assetPagination.totalPage = Math.ceil(numberOfRecords / 10);
        assetPagination.currentPage = assetPage;
        res.json({
            assetPagination : assetPagination, consumablePagination : consumablePagination, ticketsAssetsListing, ticketsConsumableListing
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Tickets could not be listed"
        })
    })
}


// router.use(tokenAuth)

router.get('/list',listTicket)
module.exports = exports = router