const models = require('../../models/index')
const router = require('express').Router()


function listConsumableNameHandler(req, res, next){
    models.consumables.findAll({attributes:['name']})
    .then(consumables => {
        res.json({
            consumablesNames : consumables,
        })
    })
    .catch(error => {
        res.json({
            consumablesName : `No Consumables`
        })
    })
}



router.get('/listNames', listConsumableNameHandler)


module.exports = exports = router