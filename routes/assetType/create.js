const models = require('../../models/index')
const router = require('express').Router()

function createNewAssetTypeHandler(req, res, next){
    var newType = models.type.build({
        assetType : req.body.assetType.charAt(0).toUpperCase() + req.body.assetType.slice(1).toLowerCase()
        ,maxRequest : req.body.maxRequest
    })
    return newType.save()
    .then(type => {
        res.json({
            message : 'New type created'
        })
    })
    .catch(error => {
        // if(error.message === '')
        res.json({
            error : error
        })
    })
}




router.post('/create', createNewAssetTypeHandler)

module.exports = exports = router