const models = require('../../models/index')
const router = require('express').Router()


function listConsumableHandler(req, res, next){
    var page = Number(req.query.page) || 1

    var sort = req.query.sort

    var min = req.query.min

    var max = req.query.max

    var smallKeyword = req.query.keyword

    // var capsKeyword = req.query.keyword.charAt(0).toUpperCase() + req.query.keyword.slice(1).toLowerCase()

    if(min === ''){
        min = 0
    }

    if (max === ''){
        max = 999999999999999999999999999
    }

    var pagination = {}

    models.consumables.count()
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        if(sort === 'default'){
            return models.consumables.findAll({order:[['consumable_id','ASC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{like:'%'+smallKeyword+'%'}}})
        }
        else if(sort === 'asc'){
            return models.consumables.findAll({order:[['quantity','ASC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{like:'%'+smallKeyword+'%'}}})
        }
        else if(sort === 'desc'){
            return models.consumables.findAll({order:[['quantity','DESC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{like:'%'+smallKeyword+'%'}}})
        }
    })
    .then(consumables => {
        res.json({
            consumables : consumables,
            pagination : pagination
        })
    })
    .catch(error => {
        res.json({
            consumables : `No Consumables`
        })
    })
}



router.get('/list', listConsumableHandler)


module.exports = exports = router