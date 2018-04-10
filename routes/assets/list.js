const models = require('../../models/index')
const router = require('express').Router()
const Sequelize = require('sequelize')


function listAssetHandler(req, res, next){
    var page = Number(req.query.page) || 1
    var search = req.query.search || '%'
    var searchFilter = []
    var pagination = {}

    var searchCategoryFilter = []

    for(var key in req.query){
        if(req.query[key] === "true" && ((key === 'Available') || (key === 'Assigned') || (key === 'Service'))){
            searchFilter.push(key)
        }
    }

    for(var key in req.query){
        if(req.query[key] === "true" && ((key === 'Electronics') || (key === 'Non-Electronics') || (key === 'Other'))){
            searchCategoryFilter.push(key)
        }
    }

    if(searchFilter.length === 0){
        searchFilter = ['Available', 'Assigned', 'Service']
    }

    if(searchCategoryFilter.length === 0){
        searchCategoryFilter = ['Electronics', 'Non-Electronics', 'Other']
    }

    models.assets.count({where : Sequelize.and({current_status : {in : searchFilter}}, {category : {in : searchCategoryFilter}}, Sequelize.or({serial_number : {like : search}}, {asset_name : {like : search}}, {invoice_number : {like : search}}, {vendor : {like : search}}))})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        return models.assets.findAll({ where : Sequelize.and({current_status : {in : searchFilter}}, {category : {in : searchCategoryFilter}}, Sequelize.or({serial_number : {like : search}}, {asset_name : {like : search}}, {invoice_number : {like : search}}, {vendor : {like : search}})), order : ['asset_id'], limit: 10, offset: (page - 1) * 10})
    })
    .then(assets => {
        res.json({
            assets : assets,
            pagination : pagination
        })
    })
    .catch(error => {
        res.json({
            assets : `No assets`
        })
    })
}




router.get('/list', listAssetHandler)


module.exports = exports = router


// condition, location