const models = require('../../models/index')
const router = require('express').Router()


function listConsumableHandler(req, res, next){
    var page = req.query.page || 1

    models.consumables.findAll({ limit: 10, offset: (page - 1) * 10})
    .then(consumables => {
        res.json({
            consumables : consumables
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