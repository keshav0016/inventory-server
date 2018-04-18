const models = require('../../models/index')
const router = require('express').Router()


function assetTypeListHandler(req, res, next){
    var limit;
    var page = req.query.page || 1
    var pagination = {}

    if(req.query.page){
        limit = 10;
    }
    else{
        limit = 99999
    }

    models.type.count()
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
    })
    models.type.findAll({limit: limit, offset: (page - 1) * 10, order : [['id', 'DESC']], attributes :['id', 'assetType', 'maxRequest']})
    .then(type => {
        res.json({
            assetTypes : type
            ,pagination : pagination
        })
    })
    .catch(error => {
        if(error){
            if(error.errors[0]){
                res.json({
                    error : error.errors[0].message
                })
            }
            res.json({
                error : error.message
            })
        }
        else{
            res.json({
                error : 'Asset Type could not be added'
            })
        }
    })
}




router.get('/list', assetTypeListHandler)

module.exports = exports = router