const models = require('../../models/index')
const router = require('express').Router()


function updateAssetTypeHandler(req, res, next){
    models.type.findOne({where : {id : req.body.id}})
    .then(type => {
        // type.assetType = req.body.assetType.charAt(0).toUpperCase() + req.body.assetType.slice(1)
        // type.maxRequest = req.body.maxRequest
        // return type.save()
        return type.update({maxRequest : req.body.maxRequest})
    })
    .then(type => {
        res.json({
            message : 'Asset Type has been updated'
        })
    })
    .catch(error => {
        res.json({
            error : error
        })
    })
}


router.post('/update', updateAssetTypeHandler)

module.exports = exports = router