const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function createNewAssetTypeHandler(req, res, next){
    return sequelize.transaction((t) => {
        var newType = models.type.build({
            assetType : req.body.assetType.charAt(0).toUpperCase() + req.body.assetType.slice(1).toLowerCase()
            ,maxRequest : req.body.maxRequest
        })
        return newType.save({
            transaction: t,
        })
    })
    
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