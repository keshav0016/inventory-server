const models = require('../../models/index')
const router = require('express').Router()


function recoverInfoHandler(req, res, next){
    models.assets_assigned.findOne({where : {asset_id : req.query.asset_id, to : null}, include : [{model : models.assets, where : {asset_id : req.query.asset_id}}, {model : models.users, attributes : ['user_id', 'first_name', 'last_name']}]})
    .then(assignedRecord => {
        res.json({
            recoverInfo : assignedRecord
        })
    })
    .catch(error => {
        res.json({
            error
        })
    })
}




router.get('/recover-info', recoverInfoHandler)

module.exports = exports = router