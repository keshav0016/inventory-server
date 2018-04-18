const models = require('../../models/index')
const router = require('express').Router()


function assetTypeListHandler(req, res, next){
    models.type.findAll()
    .then(type => {
        res.json({
            assetTypes : type
        })
    })
    .catch(error => {
        res.json({
            error : error
        })
    })
}




router.get('/list', assetTypeListHandler)

module.exports = exports = router