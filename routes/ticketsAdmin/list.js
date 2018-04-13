const models = require('../../models/index')
const router = require('express').Router()


function listTicketToAdminHandler(req, res, next){
    var assetPage = req.query.assetPage || 1
    var consumablePage = req.query.consumablePage || 1
    var searchFilter = []

    for(var key in req.query){
        if(req.query[key] === "true"){
            searchFilter.push(key)
        }
    }


    if(searchFilter.length === 0){
        searchFilter = ['Pending', 'Accepted', 'Rejected']
    }


    var assetPagination = {}
    var consumablePagination = {}
    var ticketsConsumableListingToAdmin = [];
    var ticketsAssetsListingToAdmin = [];
    
    models.ticket.findAll({include : [{ model : models.users, attributes : ['first_name','last_name']}],where : {status : {in : searchFilter}, item_type : 'assets'}, limit: 10, offset: (assetPage - 1) * 10, order : [['date', 'DESC']] })
    .then(ticketsAssetsListing => {
        if(ticketsAssetsListing){
            ticketsAssetsListingToAdmin.push(...ticketsAssetsListing);
        }
        return models.ticket.count({where : {status : {in : searchFilter}, item_type : 'assets'}})
    })
    .then(numberOfRecords => {
        assetPagination.totalPage = Math.ceil(numberOfRecords / 10);
        assetPagination.currentPage = assetPage;
        return models.ticket.findAll({include : [{ model : models.users, attributes : ['first_name','last_name']}],where : {status : {in : searchFilter}, item_type : 'consumables'}, limit: 10, offset: (consumablePage - 1) * 10, order : [['date', 'DESC']] })
    })
    .then(ticketConsumableListing => {
        if(ticketConsumableListing){
            ticketsConsumableListingToAdmin.push(...ticketConsumableListing)
        }
        return models.ticket.count({where : {status : {in : searchFilter}, item_type : 'consumables'}})
    })
    .then(numberOfRecords => {
        consumablePagination.totalPage = Math.ceil(numberOfRecords / 10);
        consumablePagination.currentPage = consumablePage;
        res.json({
            assetPagination : assetPagination, consumablePagination : consumablePagination, assetsTicket : ticketsAssetsListingToAdmin, consumableTicket : ticketsConsumableListingToAdmin
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Tickets could not be listed"
        })
    })
}




router.get('/list', listTicketToAdminHandler)

module.exports = exports = router