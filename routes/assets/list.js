const models = require('../../models/index')
const router = require('express').Router()


function listAssetHandler(req, res, next){
    var page = req.query.page || 1
    var searchFilter = []
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

    var pagination = {}

    models.assets.count({where : {current_status : {notIn : searchFilter}}})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        return models.assets.findAll({ where : {current_status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10})
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