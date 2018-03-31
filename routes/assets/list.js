const models = require('../../models/index')
const router = require('express').Router()
const Sequelize = require('sequelize')


function listAssetHandler(req, res, next){
    var page = Number(req.query.page) || 1
    var search = req.query.search || '%'
    var searchFilter = []
    var pagination = {}

    var filter = {
        "Available" : true,
        "Assigned" : true,
        "Service" : true
    }

    for(var key in req.query){
        if(req.query[key] === "false"){
            searchFilter.push(key)
        }
    }


    if(searchFilter.length === 0){
        searchFilter[0] = ""
    }


    models.assets.count({where : Sequelize.and({current_status : {notIn : searchFilter}}, Sequelize.or({serial_number : {like : search}}, {asset_name : {like : search}}, {description : {like : search}}, {invoice_number : {like : search}}, {vendor : {like : search}}))})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        return models.assets.findAll({ where : Sequelize.and({current_status : {notIn : searchFilter}}, Sequelize.or({serial_number : {like : search}}, {asset_name : {like : search}}, {description : {like : search}}, {invoice_number : {like : search}}, {vendor : {like : search}})), order : ['asset_id'], limit: 10, offset: (page - 1) * 10})
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