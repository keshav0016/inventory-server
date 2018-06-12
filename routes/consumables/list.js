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
        max = Number.MAX_VALUE
    }

    var pagination = {}

    models.consumables.count({where: {quantity:{between:[min,max]},name:{ilike:'%'+smallKeyword+'%'}}})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        if(sort === 'default'){
            return models.consumables.findAll({order:[['createdAt','DESC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{ilike:'%'+smallKeyword+'%'}}})
        }
        else if(sort === 'quantityAsc'){
            return models.consumables.findAll({order:[['quantity','ASC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{ilike:'%'+smallKeyword+'%'}}})
        }
        else if(sort === 'quantityDesc'){
            return models.consumables.findAll({order:[['quantity','DESC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{ilike:'%'+smallKeyword+'%'}}})
        }
        else if(sort === 'purchasedAsc'){
            return models.consumables.findAll({order:[['createdAt','DESC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{ilike:'%'+smallKeyword+'%'}}})
        }
        else if(sort === 'purchasedDesc'){
            return models.consumables.findAll({order:[['createdAt','ASC']],limit: 10, offset: (page - 1) * 10,where: {quantity:{between:[min,max]},name:{ilike:'%'+smallKeyword+'%'}}})
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