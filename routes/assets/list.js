const models = require('../../models/index')
const router = require('express').Router()


function listAssetHandler(req, res, next){
    // var filter = req.query.filter.charAt(0).toUpperCase() + req.query.filter.slice(1).toLowerCase();
    var searchFilter = []
    var filter = {
        "Available" : true,
        "Assigned" : true,
        "Service" : true
    }

    for(var key in filter){
        if(req.query[key] === false){
            filter[key] = false
        }
        if(filter[key] === true){
            searchFilter.push(key)
        }
    }

    models.assets.findAll({ where : {current_status : {in : searchFilter}}})
    .then(assets => {
        res.json({
            assets : assets
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