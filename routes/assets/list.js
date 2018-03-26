const models = require('../../models/index')
const router = require('express').Router()


function listAssetHandler(req, res, next){
    var searchFilter = []
    var page = req.query.page || 1
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

    models.assets.findAll({ where : {current_status : {notIn : searchFilter}}, limit: 10, offset: (page - 1) * 10})
    .then(assets => {
        res.json({
            assets : assets,
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