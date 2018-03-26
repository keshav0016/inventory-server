const models = require('../../models/index')
const router = require('express').Router()
const createConsumableHandler = require('./create')
const deleteConsumableHandler = require('./delete')
const updateConsumableHandler = require('./update')
const assignConsumableHandler = require('./assign')
const historyConsumableHandler = require('./history')


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



router.use(createConsumableHandler)
router.use(deleteConsumableHandler)
router.use(updateConsumableHandler)
router.use(assignConsumableHandler)
router.use(historyConsumableHandler)
router.get('/list', listConsumableHandler)


module.exports = exports = router